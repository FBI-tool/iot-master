package protocol

import (
	"fmt"
	"github.com/zgwit/iot-master/v4/connect"
	"github.com/zgwit/iot-master/v4/types"
)

var protocols = map[string]*Protocol{}

func Protocols() []*Protocol {
	var ps []*Protocol
	for _, p := range protocols {
		ps = append(ps, p)
	}
	return ps
}

func Get(name string) (*Protocol, error) {
	if p, ok := protocols[name]; ok {
		return p, nil
	}
	return nil, fmt.Errorf("协议 %s 找不到", name)
}

func Register(proto *Protocol) {
	protocols[proto.Name] = proto
}

func Create(conn connect.Tunnel, name string, opts types.Options) (Adapter, error) {
	if p, ok := protocols[name]; ok {
		return p.Factory(conn, opts)
	}
	return nil, fmt.Errorf("协议 %s 找不到", name)
}
