package master

import (
	"fmt"
	"iot-master/internal/log"
	"iot-master/model"
	"math"
	"sync"
)

var allDevices sync.Map
var allProjects sync.Map

//LoadDevices 加载设备
func LoadDevices() error {
	var devices []*model.Device
	err := db.Engine.Limit(math.MaxInt).Find(&devices)
	if err != nil {
		return err
	}
	for _, d := range devices {
		if d.Disabled {
			continue
		}

		dev, err := NewDevice(d)
		if err != nil {
			log.Error(err)
			continue
		}
		allDevices.Store(d.Id, dev)
		//err = dev.Start()
		//if err != nil {
		//	log.Error(err)
		//}
	}
	return nil
}

//LoadDevice 加载设备
func LoadDevice(id uint64) (*Device, error) {
	device := &model.Device{}
	has, err := db.Engine.ID(id).Get(device)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, fmt.Errorf("找不到设备 %d", id)
	}

	dev, err := NewDevice(device)
	if err != nil {
		return dev, err
	}
	//allDevices.Store(device.Id, dev)
	allDevices.Store(id, dev)
	//err = dev.Start() //此处应该交给tunnel online启动
	return dev, nil
}

//GetDevice 获取设备
func GetDevice(id uint64) *Device {
	d, ok := allDevices.Load(id)
	if ok {
		return d.(*Device)
	}
	return nil
}

//RemoveDevice 删除设备
func RemoveDevice(id uint64) error {
	d, ok := allDevices.LoadAndDelete(id)
	if ok {
		dev := d.(*Device)
		return dev.Stop()
	}
	return nil //error
}

//GetProject 获取项目
func GetProject(id uint64) *Project {
	d, ok := allProjects.Load(id)
	if ok {
		return d.(*Project)
	}
	return nil
}

//RemoveProject 删除项目
func RemoveProject(id uint64) error {
	d, ok := allProjects.LoadAndDelete(id)
	if ok {
		dev := d.(*Project)
		return dev.Stop()
	}
	return nil //error
}

//LoadProjects 加载项目
func LoadProjects() error {
	var projects []*model.Project
	err := db.Engine.Limit(math.MaxInt).Find(&projects)
	if err != nil {
		return err
	}
	for _, p := range projects {
		if p.Disabled {
			continue
		}

		prj, err := NewProject(p)
		if err != nil {
			log.Error(err)
			continue
		}
		allProjects.Store(p.Id, prj)

		err = prj.Start()
		if err != nil {
			log.Error(err)
		}
	}
	return nil
}

//LoadProject 加载项目
func LoadProject(id uint64) (*Project, error) {
	project := &model.Project{}
	has, err := db.Engine.ID(id).Get(project)
	if err != nil {
		return nil, err
	}
	if !has {
		return nil, fmt.Errorf("找不到项目 %d", id)
	}

	prj, err := NewProject(project)
	if err != nil {
		return nil, err
	}

	allProjects.Store(id, prj)

	err = prj.Start()
	if err != nil {
		return nil, err
	}
	return prj, nil
}
