package protocols

import (
	"fmt"
	"github.com/zgwit/iot-master/connect"
	"github.com/zgwit/iot-master/protocol"
	"github.com/zgwit/iot-master/protocols/modbus"
)

var protocols = []protocol.Item{
	modbus.DescRTU,
	modbus.DescTCP,
}

func Protocols() []protocol.Item {
	return protocols
}

func Create(link connect.Link, name string, options protocol.Options) (protocol.Protocol, error) {
	for _, d := range protocols {
		if d.Name == name {
			return d.Factory(link, options), nil
		}
	}
	return nil, fmt.Errorf("unkown protocol: %s", name)
}
