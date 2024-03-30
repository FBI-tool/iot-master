package tunnel

import (
	"errors"
	"github.com/zgwit/iot-master/v4/connect"
	"github.com/zgwit/iot-master/v4/protocol"
	"go.bug.st/serial"
	"io"
	"net"
	"time"
)

type PollerOptions struct {
	PollerPeriod   uint `json:"poller_period,omitempty"`   //采集周期
	PollerInterval uint `json:"poller_interval,omitempty"` //采集间隔
}

type ProtocolOptions struct {
	ProtocolName    string         `json:"protocol_name,omitempty"`    //协议 rtu tcp parallel-tcp
	ProtocolOptions map[string]any `json:"protocol_options,omitempty"` //协议参数
}

type RetryOptions struct {
	RetryTimeout uint `json:"retry_timeout,omitempty"` //重试时间
	RetryMaximum uint `json:"retry_maximum,omitempty"` //最大次数
}

type Base struct {
	Id          string `json:"id,omitempty" xorm:"pk"` //ID
	Name        string `json:"name,omitempty"`         //名称
	Description string `json:"description,omitempty"`  //说明
	Heartbeat   string `json:"heartbeat,omitempty"`    //心跳包

	ProtocolOptions `xorm:"extends"`
	PollerOptions   `xorm:"extends"`

	Disabled bool      `json:"disabled"`
	Created  time.Time `json:"created" xorm:"created"` //创建时间

	running bool
	closed  bool

	//连接
	conn connect.Conn //`xorm:"-"`

	adapter protocol.Adapter

	//透传
	pipe io.ReadWriteCloser

	//保持
	keeper *Keeper
}

func (l *Base) ID() string {
	return l.Id
}

func (l *Base) Running() bool {
	return l.running
}

func (l *Base) Closed() bool {
	return l.closed
}

// Close 关闭
func (l *Base) Close() error {
	if l.closed {
		return errors.New("tunnel closed")
	}

	l.running = false
	l.closed = true

	if l.pipe != nil {
		_ = l.pipe.Close()
	}

	return l.conn.Close()
}

// Write 写
func (l *Base) Write(data []byte) (int, error) {
	if !l.running {
		return 0, errors.New("tunnel closed")
	}
	if l.pipe != nil {
		return 0, nil //透传模式下，直接抛弃
	}
	n, err := l.conn.Write(data)
	if err != nil {
		//关闭连接
		_ = l.conn.Close()
		l.running = false
	}
	return n, err
}

// Read 读
func (l *Base) Read(data []byte) (int, error) {
	if !l.running {
		return 0, errors.New("tunnel closed")
	}
	if l.pipe != nil {
		//先read，然后透传
		return 0, nil //透传模式下，直接抛弃
	}
	n, err := l.conn.Read(data)
	if err != nil {
		//网络错误（读超时除外）
		var ne net.Error
		if errors.As(err, &ne) && ne.Timeout() {
			return 0, err
		}

		//串口错误（读超时除外）
		var se *serial.PortError
		if errors.As(err, &se) && (se.Code() == serial.InvalidTimeoutValue) {
			return 0, err
		}

		//其他错误，关闭连接
		_ = l.conn.Close()
		l.running = false
	}
	return n, err
}

func (l *Base) SetReadTimeout(t time.Duration) error {
	return l.conn.SetReadTimeout(t)
}

func (l *Base) Pipe(pipe io.ReadWriteCloser) {
	//关闭之前的透传
	if l.pipe != nil {
		_ = l.pipe.Close()
	}

	l.pipe = pipe
	//传入空，则关闭
	if pipe == nil {
		return
	}

	buf := make([]byte, 1024)
	for {
		n, err := pipe.Read(buf)
		if err != nil {
			//if err == io.EOF {
			//	continue
			//}
			//pipe关闭，则不再透传
			break
		}
		//将收到的数据转发出去
		n, err = l.conn.Write(buf[:n])
		if err != nil {
			//发送失败，说明连接失效
			_ = pipe.Close()
			break
		}
	}
	l.pipe = nil

	//TODO 使用io.copy
	//go io.Copy(pipe, l.conn)
	//go io.Copy(l.conn, pipe)
}
