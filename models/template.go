package models

type Template struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Version     string `json:"version"`

	Adapter    TemplateAdapter    `json:"adapter"`
	Variables  []TemplateVariable `json:"variables"`
	Batches    []TemplateBatch    `json:"batches"`
	Jobs       []TemplateJob      `json:"jobs"`
	Strategies []TemplateStrategy `json:"strategies"`
}

type TemplateBase struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type TemplateAdapter struct {
	TemplateBase `xorm:"extends"`

	ProtocolName string `json:"protocol_name"`
	ProtocolOpts string `json:"protocol_opts"`

	PollingEnable   bool `json:"polling_enable"`   //轮询
	PollingInterval int  `json:"polling_interval"` //轮询间隔 ms
	PollingCycle    int  `json:"polling_cycle"`    //轮询周期 s
}

type TemplateVariable struct {
	TemplateBase `xorm:"extends"`

	Address `xorm:"extends"`

	Type string `json:"type"`
	Unit string `json:"unit"` //单位

	Scale    float32 `json:"scale"` //倍率，比如一般是 整数÷10，得到
	Default  string  `json:"default"`
	Writable bool    `json:"writable"` //可写，用于输出（如开关）

	//采样：无、定时、轮询
	Cron          string `json:"cron"`
	PollingEnable bool   `json:"polling_enable"` //轮询
	PollingTimes  int    `json:"polling_times"`
}

type TemplateBatch struct {
	TemplateBase `xorm:"extends"`

	Address `xorm:"extends"`

	Size int `json:"size"`

	//采样：无、定时、轮询
	Cron          string `json:"cron"`
	PollingEnable bool   `json:"polling_enable"` //轮询
	PollingTimes  int    `json:"polling_times"`
}

type TemplateJob struct {
	TemplateBase `xorm:"extends"`

	Cron   string `json:"cron"`
	Script string `json:"script"` //javascript
}

type TemplateStrategy struct {
	TemplateBase `xorm:"extends"`

	Script string `json:"script"` //javascript
}
