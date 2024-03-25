package broker

import (
	"fmt"
	mochi "github.com/mochi-mqtt/server/v2"
	"github.com/mochi-mqtt/server/v2/hooks/auth"
	"github.com/mochi-mqtt/server/v2/listeners"
	"github.com/zgwit/iot-master/v4/pkg/config"
	"github.com/zgwit/iot-master/v4/pkg/db"
	"github.com/zgwit/iot-master/v4/pkg/log"
	"strconv"
	"xorm.io/xorm"
)

var Server *mochi.Server

func Boot() error {

	if !config.GetBool(MODULE, "enable") {
		return nil
	}

	//创建内部Broker
	Server = mochi.New(nil)

	//TODO 鉴权
	_ = Server.AddHook(new(auth.AllowHook), nil)

	//监听默认端口
	port := config.GetInt(MODULE, "port")
	addr := ":" + strconv.Itoa(port)
	err := Server.AddListener(listeners.NewTCP(listeners.Config{
		Type:    "tcp",
		ID:      "embed",
		Address: addr,
	}))
	if err != nil {
		return err
	}

	//监听UnixSocket，Win10以下版本有问题
	//if options.Unix {
	//	err = Server.AddListener(listeners.NewUnixSock("embed-unix", options.Addr))
	//	if err != nil {
	//		log.Error(err)
	//		//return err
	//	}
	//}

	return Server.Serve()
}

func Close() {
	if Server != nil {
		err := Server.Close()
		if err != nil {
			log.Error(err)
		}
		Server = nil
	}
}

func loadListeners() error {
	//监听服务
	//加载数据库中 entrypoint
	var entries []Broker
	err := db.Engine.Find(&entries)
	if err != nil && err != xorm.ErrNotExist {
		return err
	}

	for _, e := range entries {
		l := listeners.NewTCP(listeners.Config{
			Type:    "tcp",
			ID:      fmt.Sprintf("tcp-%s", e.Id),
			Address: fmt.Sprintf(":%d", e.Port),
		})
		err = Server.AddListener(l)
		if err != nil {
			//return err
			log.Error(err)
		}
	}

	return nil
}
