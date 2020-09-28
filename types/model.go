package types

type _base struct {
	Id          int    `json:"id" storm:"id,increment"`
	ModelId     int    `json:"model_id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type ModelTunnel struct {
	_base    `storm:"inline"`
	LinkId   int    `json:"link_id"`
	Protocol string `json:"protocol"`
}

type ModelVariable struct {
	_base    `storm:"inline"`
	TunnelId int    `json:"tunnel_id"`
	Type     string `json:"type"`
	Addr     string `json:"addr"`
	Default  string `json:"default"`
	Writable bool   `json:"writable"` //可写，用于输出（如开关）

	//TODO 采样：无、定时、轮询
	Cron string `json:"cron"`

	Children []ModelVariable `json:"children"`
}

type ModelBatchResult struct {
	Offset   int    `json:"offset"`
	Variable string `json:"variable"` //ModelVariable path
}

type ModelBatch struct {
	_base    `storm:"inline"`
	TunnelId int    `json:"tunnel_id"`
	Type     string `json:"type"`
	Addr     string `json:"addr"`
	Size     int    `json:"size"`
	Cron     string `json:"cron"`

	Results []ModelBatchResult `json:"results"`
}

type ModelJob struct {
	_base  `storm:"inline"`
	Cron   string `json:"cron"`
	Script string `json:"script"` //javascript
}

type ModelStrategy struct {
	_base  `storm:"inline"`
	Script string `json:"script"` //javascript
}

type Model struct {
	Id          int    `json:"id" storm:"id,increment"`
	Name        string `json:"name"`
	Description string `json:"description"`
	Version     string `json:"version"`
	H5          string `json:"h5"`
}
