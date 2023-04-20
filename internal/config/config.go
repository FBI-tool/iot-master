package config

import (
	"github.com/zgwit/iot-master/v3/internal/args"
	broker2 "github.com/zgwit/iot-master/v3/internal/broker"
	"github.com/zgwit/iot-master/v3/pkg/db"
	"github.com/zgwit/iot-master/v3/pkg/log"
	"github.com/zgwit/iot-master/v3/pkg/mqtt"
	"github.com/zgwit/iot-master/v3/pkg/web"
	"gopkg.in/yaml.v3"
	"os"
)

// Configure 配置
type Configure struct {
	Oem      OEM             `json:"oem"`
	Web      web.Options     `json:"web"`
	Broker   broker2.Options `json:"broker"`
	Log      log.Options     `json:"log"`
	Mqtt     mqtt.Options    `json:"mqtt"`
	Database db.Options      `json:"database"`
}

// Config 全局配置
var Config = Configure{
	Oem: OEM{
		Title:     "物联大师",
		Logo:      "",
		Company:   "无锡真格智能科技有限公司",
		Copyright: "©2023",
	},
	Web:      web.Default(),
	Log:      log.Default(),
	Mqtt:     mqtt.Default(),
	Broker:   broker2.Default(),
	Database: db.Default(),
}

// Load 加载
func Load() error {
	//log.Println("加载配置")
	//从参数中读取配置文件名
	filename := args.ConfigPath

	// 如果没有文件，则使用默认信息创建
	if _, err := os.Stat(filename); os.IsNotExist(err) {
		return Store()
		//return nil
	} else {
		y, err := os.Open(filename)
		if err != nil {
			log.Fatal(err)
			return err
		}
		defer y.Close()

		d := yaml.NewDecoder(y)
		err = d.Decode(&Config)
		if err != nil {
			log.Fatal(err)
			return err
		}

		return nil
	}
}

func Store() error {
	//log.Println("保存配置")
	//从参数中读取配置文件名
	filename := args.ConfigPath

	y, err := os.OpenFile(filename, os.O_RDWR|os.O_CREATE, 0755) //os.Create(filename)
	if err != nil {
		log.Fatal(err)
		return err
	}
	defer y.Close()

	e := yaml.NewEncoder(y)
	defer e.Close()

	err = e.Encode(&Config)
	if err != nil {
		log.Fatal(err)
		return err
	}

	return nil
}