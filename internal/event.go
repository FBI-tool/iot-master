package internal

import (
	"github.com/zgwit/iot-master/v4/db"
	"github.com/zgwit/iot-master/v4/device"
	"github.com/zgwit/iot-master/v4/log"
	"github.com/zgwit/iot-master/v4/mqtt"
	"github.com/zgwit/iot-master/v4/payload"
	"github.com/zgwit/iot-master/v4/types"
	"strings"
)

func subscribeEvent() {
	mqtt.Subscribe[payload.Event]("up/event/+", func(topic string, event *payload.Event) {
		topics := strings.Split(topic, "/")
		//pid := topics[2]
		id := topics[2]

		dev, err := device.Ensure(id)
		if err != nil {
			log.Error(err)
			return
		}

		//保存数据库
		_, _ = db.Engine.InsertOne(types.DeviceEvent{
			DeviceId: id,
			Name:     event.Name,
			Label:    event.Title,
			Output:   event.Output,
		})

		switch event.Name {
		case "online":
			dev.Online()
		case "offline":
			dev.Offline()
		}
	})

}