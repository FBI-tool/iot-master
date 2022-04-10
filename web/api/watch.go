package api

import (
	"encoding/json"
	"github.com/zgwit/iot-master/events"
	"golang.org/x/net/websocket"
)

func watchAllEvents(ws *websocket.Conn, emitter events.EventInterface) {
	ws.PayloadType = websocket.TextFrame

	if emitter == nil {
		buf, err := json.Marshal(&WatchMessage{Event: "error", Data: "找不到目标"})
		if err != nil {
			_, _ = ws.Write(buf)
		}
		_ = ws.Close()
		return
	}

	subAll := func(event string, data interface{}) {
		buf, err := json.Marshal(&WatchMessage{Event: event, Data: data})
		if err != nil {
			_, err := ws.Write(buf)
			if err != nil {
				_ = ws.Close()
			}
		}
	}
	go func() {
		//监听消息
		emitter.On("*", subAll)
		//接收数据，并忽略
		for {
			buf := make([]byte, 1)
			_, err := ws.Read(buf)
			if err != nil {
				_ = ws.Close()
				break
			}
		}
		//关闭监听
		emitter.Off("*", subAll)
	}()
}