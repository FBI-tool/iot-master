package model

import "time"

type Pipe struct {
	Id       int64     `json:"id"`
	LinkId   int64     `json:"link_id"`
	Name     string    `json:"name"`
	Port     int       `json:"port"`
	Disabled bool      `json:"disabled"`
	Updated  time.Time `json:"updated" xorm:"updated"`
	Created  time.Time `json:"created" xorm:"created"`
	Deleted  time.Time `json:"-" xorm:"deleted"`
}

type PipeEx struct {
	Pipe    `xorm:"extends"`
	Running bool   `json:"running"`
	Link    string `json:"link"`
}

func (p *PipeEx) TableName() string {
	return "pipe"
}
