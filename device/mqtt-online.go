package device

import (
	"github.com/zgwit/iot-master/v4/log"
	"github.com/zgwit/iot-master/v4/mqtt"
	"strings"
)

func mqttOnline() {

	mqtt.Subscribe("device/+/online", func(topic string, _ []byte) {
		topics := strings.Split(topic, "/")
		id := topics[1]

		dev, err := Ensure(id)
		if err != nil {
			log.Error(err)
			return
		}
		dev.Online = true
	})

	mqtt.Subscribe("device/+/offline", func(topic string, _ []byte) {
		topics := strings.Split(topic, "/")
		id := topics[1]

		dev, err := Ensure(id)
		if err != nil {
			log.Error(err)
			return
		}
		dev.Online = false

		//产生日志
		//al := alarm.AlarmEx{
		//	Alarm: alarm.Alarm{
		//		DeviceId: id,
		//		Type:     "离线", //TODO 在 产品和设备 中配置
		//		Title:    "离线",
		//		Level:    3,
		//	},
		//	Product: dev.product.Assign,
		//	Device:  dev.name,
		//}
		//_, err = db.Engine.Insert(&al.Alarm)
		//if err != nil {
		//	log.Error(err)
		//	//continue
		//}

		//通知
		//err = notify(&al)
		//if err != nil {
		//	log.Error(err)
		//	//continue
		//}

	})
}
