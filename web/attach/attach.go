package attach

import (
	"github.com/gin-gonic/gin"
	"github.com/zgwit/iot-master/v4/web/curd"
	"io"
	"mime"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type attachInfo struct {
	Name   string    `json:"name,omitempty"`
	Mime   string    `json:"mime,omitempty"`
	Time   time.Time `json:"time"`
	Size   int64     `json:"size,omitempty"`
	Folder bool      `json:"folder,omitempty"`
}

type RenameBody struct {
	Name string `json:"name,omitempty"`
}

type MoveBody struct {
	Path string `json:"path,omitempty"`
}

// @Summary 查询附件
// @Schemes
// @Description 查询附件
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[[]attachInfo] 返回插件信息
// @Router /attach/list/{name} [get]
func ApiList(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		//列出目录
		filename := filepath.Join(root, ctx.Param("name"))
		files, err := os.ReadDir(filename)
		if err != nil {
			curd.Error(ctx, err)
			return
		}

		var items []*attachInfo
		for _, stat := range files {
			info, _ := stat.Info()
			item := &attachInfo{
				Name:   info.Name(),
				Time:   info.ModTime(),
				Size:   info.Size(),
				Folder: info.IsDir(),
			}
			//识别类型
			if !stat.IsDir() {
				item.Mime = mime.TypeByExtension(filepath.Ext(stat.Name()))
			}
			items = append(items, item)
		}
		curd.OK(ctx, items)
	}
}

// @Summary 查询附件信息
// @Schemes
// @Description 查询附件信息
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[attachInfo] 返回插件信息
// @Router /attach/info/{name} [get]
func ApiInfo(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		//列出目录
		filename := filepath.Join(root, ctx.Param("name"))
		info, err := os.Stat(filename)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		item := &attachInfo{
			Name:   info.Name(),
			Time:   info.ModTime(),
			Size:   info.Size(),
			Folder: info.IsDir(),
		}

		curd.OK(ctx, item)
	}
}

// @Summary 上传附件
// @Schemes
// @Description 上传附件，支持多文件
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/upload/{name} [post]
func ApiUpload(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		dir := filepath.Join(root, ctx.Param("name"))
		_ = os.MkdirAll(dir, os.ModePerm) //创建目录

		form, err := ctx.MultipartForm()
		if err != nil {
			curd.Error(ctx, err)
			return
		}

		//接收所有附件
		for _, files := range form.File {
			for _, header := range files {
				filename := filepath.Join(dir, header.Filename)
				err := ctx.SaveUploadedFile(header, filename)
				if err != nil {
					curd.Error(ctx, err)
					return
				}
			}
		}

		curd.OK(ctx, nil)
	}
}

// @Summary 修改附件
// @Schemes
// @Description 修改附件，body是内容
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/write/{name} [post]
func ApiWrite(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		filename := filepath.Join(root, ctx.Param("name"))
		_ = os.MkdirAll(filepath.Dir(filename), os.ModePerm) //创建目录
		f, err := os.OpenFile(filename, os.O_CREATE|os.O_WRONLY, os.ModePerm)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		defer f.Close()

		_, err = io.Copy(f, ctx.Request.Body)
		if err != nil {
			curd.Error(ctx, err)
			return
		}

		curd.OK(ctx, nil)
	}
}

// @Summary 读取附件
// @Schemes
// @Description 读取附件
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} string 返回
// @Router /attach/read/{name} [get]
func ApiRead(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		filename := filepath.Join(root, ctx.Param("name"))
		http.ServeFile(ctx.Writer, ctx.Request, filename)
	}
}

// @Summary 下载附件
// @Schemes
// @Description 下载附件
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} string 返回
// @Router /attach/download/{name} [get]
func ApiDownload(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		filename := filepath.Join(root, ctx.Param("name"))
		ctx.Header("Content-Disposition", "attachment; filename="+ctx.Param("name"))
		http.ServeFile(ctx.Writer, ctx.Request, filename)
	}
}

// @Summary 命名
// @Schemes
// @Description 下载附件
// @Tags attach
// @Param name path string true "文件路径"
// @Param rename body RenameBody true "重命名"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/rename/{name} [post]
func ApiRename(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var rename RenameBody
		err := ctx.ShouldBindJSON(&rename)
		if err != nil {
			curd.Error(ctx, err)
			return
		}

		filename := filepath.Join(root, ctx.Param("name"))
		newPath := filepath.Join(filepath.Dir(filename), rename.Name)

		err = os.Rename(filename, newPath)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	}
}

// @Summary 删除附件
// @Schemes
// @Description 删除附件
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/remove/{name} [get]
func ApiRemove(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		filename := filepath.Join(root, ctx.Param("name"))
		err := os.Remove(filename)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	}
}

// @Summary 移动附件
// @Schemes
// @Description 移动附件
// @Tags attach
// @Param name path string true "文件路径"
// @Param move body MoveBody true "移动"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/move/{name} [post]
func ApiMove(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		var move MoveBody
		err := ctx.ShouldBindJSON(&move)
		if err != nil {
			curd.Error(ctx, err)
			return
		}

		filename := filepath.Join(root, ctx.Param("name"))
		newPath := filepath.Join(root, move.Path, filepath.Base(filename))

		err = os.Rename(filename, newPath)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	}
}

// @Summary 创建目录
// @Schemes
// @Description 创建目录
// @Tags attach
// @Param name path string true "文件路径"
// @Accept json
// @Produce json
// @Success 200 {object} curd.ReplyData[int] 返回
// @Router /attach/makedir/{name} [get]
func ApiMakeDir(root string) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		filename := filepath.Join(root, ctx.Param("name"))
		err := os.MkdirAll(filename, os.ModePerm)
		if err != nil {
			curd.Error(ctx, err)
			return
		}
		curd.OK(ctx, nil)
	}
}

func Routers(root string, app *gin.RouterGroup) {

	app.GET("/list/*name", ApiList(root))

	app.GET("/info/*name", ApiInfo(root))

	app.GET("/read/*name", ApiRead(root))

	app.POST("/write/*name", ApiWrite(root))

	app.POST("/upload/*name", ApiUpload(root))

	app.GET("/download/*name", ApiDownload(root))

	app.POST("/rename/*name", ApiRename(root))

	app.GET("/remove/*name", ApiRemove(root))

	app.POST("/move/*name", ApiMove(root))

	app.GET("/mkdir/*name", ApiMakeDir(root))
}
