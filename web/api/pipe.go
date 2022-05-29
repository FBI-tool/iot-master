package api

import (
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/db"
	"github.com/zgwit/iot-master/master"
	"github.com/zgwit/iot-master/model"
)

func pipeList(ctx *gin.Context) {
	pipes := make([]*model.PipeEx, 0)

	var body paramSearchEx
	err := ctx.ShouldBindJSON(&body)
	if err != nil {
		replyError(ctx, err)
		return
	}

	query := body.toQuery()
	query.Select("pipe.*, " + //TODO 只返回需要的字段
		" 0 as running, tunnel.name as tunnel")
	query.Join("LEFT", "tunnel", "pipe.tunnel_id=tunnel.id")

	cnt, err := query.FindAndCount(&pipes)
	if err != nil {
		replyError(ctx, err)
		return
	}
	for _, pe := range pipes {
		d := master.GetPipe(pe.Id)
		if d != nil {
			pe.Running = d.Running()
		}
	}
	replyList(ctx, pipes, cnt)
}

func afterPipeCreate(data interface{}) error {
	pipe := data.(*model.Pipe)
	//启动
	if !pipe.Disabled {
		return master.LoadPipe(pipe.Id)
	}
	return nil
}

func pipeDetail(ctx *gin.Context) {
	var pe model.PipeEx
	has, err := db.Engine.ID(ctx.GetInt64("id")).Get(&pe.Pipe)
	if err != nil {
		replyError(ctx, err)
		return
	}
	if !has {
		replyFail(ctx, "记录不存在")
		return
	}
	d := master.GetPipe(pe.Id)
	if d != nil {
		pe.Running = d.Running()
	}
	replyOk(ctx, pe)

}

func afterPipeUpdate(data interface{}) error {
	pipe := data.(*model.Pipe)
	_ = master.RemovePipe(pipe.Id)
	return master.LoadPipe(pipe.Id)
}

func afterPipeDelete(id interface{}) error {
	return master.RemovePipe(id.(int64))
}

func pipeStart(ctx *gin.Context) {
	pipe := master.GetPipe(ctx.GetInt64("id"))
	if pipe == nil {
		replyFail(ctx, "not found")
		return
	}
	err := pipe.Open()
	if err != nil {
		replyError(ctx, err)
		return
	}

	replyOk(ctx, nil)
}

func pipeStop(ctx *gin.Context) {
	pipe := master.GetPipe(ctx.GetInt64("id"))
	if pipe == nil {
		replyFail(ctx, "not found")
		return
	}
	err := pipe.Close()
	if err != nil {
		replyError(ctx, err)
		return
	}

	replyOk(ctx, nil)
}

func afterPipeEnable(id interface{}) error {
	_ = master.RemovePipe(id.(int64))
	return master.LoadPipe(id.(int64))
}

func afterPipeDisable(id interface{}) error {
	return master.RemovePipe(id.(int64))
}
