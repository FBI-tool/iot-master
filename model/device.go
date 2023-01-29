package model

import (
	"time"
)

// Device 设备
type Device struct {
	Id       string    `json:"id" xorm:"pk"`
	Model    string    `json:"model"`
	Name     string    `json:"name"`
	Desc     string    `json:"desc"`
	Disabled bool      `json:"disabled"`
	Created  time.Time `json:"created" xorm:"created"`
}
