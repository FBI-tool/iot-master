package alarm

import (
	"context"
	"github.com/PaesslerAG/gval"
	"github.com/zgwit/iot-master/v4/log"
	"github.com/zgwit/iot-master/v4/pkg/calc"
	"time"
)

type Validator struct {
	Expression  string `json:"expression"`
	Type        string `json:"type"`
	Title       string `json:"title"`
	Level       uint   `json:"level"`
	Template    string `json:"template"`
	Delay       uint   `json:"delay,omitempty"`        //延迟时间s
	Repeat      bool   `json:"repeat,omitempty"`       //重启报警
	RepeatDelay uint   `json:"repeat_delay,omitempty"` //再次提醒间隔s
	RepeatTotal uint   `json:"repeat_total,omitempty"` //总提醒次数

	evaluable gval.Evaluable

	//again      bool
	start int64 //开始时间s
	count uint  //报警次数
	//reported bool
}

func (v *Validator) Compile() (err error) {
	v.evaluable, err = calc.New(v.Expression)
	return
}

func (v *Validator) Validate(values map[string]any) bool {
	ret, err := v.evaluable.EvalBool(context.Background(), values)
	if err != nil {
		log.Error(err)
		return false
	}

	if !ret {
		//约束OK，检查下一个
		v.start = 0
		v.count = 0
		return false
	}

	//起始时间
	now := time.Now().Unix()
	if v.start == 0 {
		v.start = now
	}

	//延迟报警
	if v.Delay > 0 {
		if now < v.start+int64(v.Delay) {
			return false
		}
	}

	if v.count > 0 {
		//重复报警
		if !v.Repeat {
			return false
		}

		//超过最大次数
		if v.RepeatTotal > 0 && v.count >= v.RepeatTotal {
			return false
		}

		//还没到时间
		if now < v.start+int64(v.RepeatDelay) {
			return false
		}

		v.start = now
	}

	v.count++

	return true
}
