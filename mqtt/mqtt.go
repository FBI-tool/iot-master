package mqtt

import (
	"encoding/json"
	paho "github.com/eclipse/paho.mqtt.golang"
	"github.com/zgwit/iot-master/v4/config"
	"github.com/zgwit/iot-master/v4/log"
	"github.com/zgwit/iot-master/v4/pool"
)

var Client paho.Client

func Close() {
	Client.Disconnect(0)
}

func Open() paho.Token {
	opts := paho.NewClientOptions()
	opts.AddBroker(config.GetString(MODULE, "url"))
	opts.SetClientID(config.GetString(MODULE, "clientId"))
	opts.SetUsername(config.GetString(MODULE, "username"))
	opts.SetPassword(config.GetString(MODULE, "password"))
	opts.SetConnectRetry(true) //重试

	opts.SetKeepAlive(20)

	//重连时，恢复订阅
	opts.SetCleanSession(false)
	opts.SetResumeSubs(true)

	//加上订阅处理
	opts.SetOnConnectHandler(func(client paho.Client) {
		//for topic, _ := range subs {
		//	Client.Subscribe(topic, 0, func(client paho.Client, message paho.Message) {
		//
		//		go func() {
		//			//依次处理回调
		//			if cbs, ok := subs[topic]; ok {
		//				for _, cb := range cbs {
		//					cb(message.Topic(), message.Payload())
		//				}
		//			}
		//		}()
		//	})
		//}
	})

	Client = paho.NewClient(opts)
	return Client.Connect()
}

func OpenBy(fn paho.OpenConnectionFunc) paho.Token {
	//client := Server.NewClient(nil, "internal", "internal", true)
	opts := paho.NewClientOptions()
	opts.AddBroker(":1883")
	opts.SetClientID("internal")

	//重连时，恢复订阅
	opts.SetCleanSession(false)
	opts.SetResumeSubs(true)

	//使用虚拟连接
	opts.SetCustomOpenConnectionFn(fn)

	Client = paho.NewClient(opts)
	return Client.Connect()
}

func Publish(topic string, payload any) paho.Token {
	bytes, _ := json.Marshal(payload)
	return Client.Publish(topic, 0, false, bytes)
}

var subs = map[string]any{}

func Subscribe[T any](filter string, cb func(topic string, value *T)) {

	var cbs []func(topic string, value *T)

	//重复订阅，直接入列
	if callbacks, ok := subs[filter]; ok {
		cbs = callbacks.([]func(topic string, value *T))
		subs[filter] = append(cbs, cb)
		return
	}

	subs[filter] = append(cbs, cb)

	//初次订阅
	Client.Subscribe(filter, 0, func(client paho.Client, message paho.Message) {
		cbs := subs[filter]
		cs := cbs.([]func(topic string, value *T))

		//解析JSON
		var value T
		if len(message.Payload()) > 0 {
			err := json.Unmarshal(message.Payload(), &value)
			if err != nil {
				log.Error(err)
				return
			}
		}

		//回调
		for _, c := range cs {
			if pool.Pool == nil {
				go c(message.Topic(), &value)
				continue
			}
			//放入线程池处理
			err := pool.Insert(func() {
				c(message.Topic(), &value)
			})
			if err != nil {
				log.Error(err)
				go c(message.Topic(), &value)
			}
		}
	})
}
