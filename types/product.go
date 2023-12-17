package types

import "time"

type Product struct {
	Id          string    `json:"id" xorm:"pk"` //ID
	Name        string    `json:"name"`         //名称
	Description string    `json:"description,omitempty"`
	Version     string    `json:"version,omitempty"`
	Created     time.Time `json:"created" xorm:"created"`
}
