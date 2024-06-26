package gateway

import (
	"github.com/zgwit/iot-master/v4/db"
	"github.com/zgwit/iot-master/v4/lib"
	"github.com/zgwit/iot-master/v4/log"
	"xorm.io/xorm"
)

var servers lib.Map[Server]

func LoadServers() error {
	var servers []*Server
	err := db.Engine.Find(&servers)
	if err != nil {
		if err == xorm.ErrNotExist {
			return nil
		}
		return err
	}
	for _, m := range servers {
		if m.Disabled {
			continue
		}
		go func(m *Server) {
			err := LoadServer(m)
			if err != nil {
				log.Error(err)
			}
		}(m)
	}
	return nil
}

func LoadServer(m *Server) error {
	servers.Store(m.Id, m)
	return m.Open()
}

func GetServer(id string) *Server {
	return servers.Load(id)
}
