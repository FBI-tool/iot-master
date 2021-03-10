package web

import (
	"git.zgwit.com/iot/mydtu/conf"
	"git.zgwit.com/iot/mydtu/web/api"
	"git.zgwit.com/iot/mydtu/web/open"
	wwwFiles "git.zgwit.com/iot/mydtu/web/www"
	"github.com/PuerkitoBio/urlesc"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/memstore"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	swaggerFiles "github.com/zgwit/swagger-files"
	"log"
	"net/http"
)

func Serve() {
	if !conf.Config.Web.Debug {
		gin.SetMode(gin.ReleaseMode)
	}

	//GIN初始化
	app := gin.Default()

	//加入swagger会增加10MB多体积，使用github.com/zgwit/swagger-files，去除Map文件，可以节省7MB左右
	//Swagger文档，需要先执行swag init生成文档
	app.GET("/docs/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	//MQTT
	app.GET("/mqtt", mqtt)
	//透传
	app.GET("/peer", peer)

	//开放接口
	open.RegisterRoutes(app.Group("/open"))

	//启用session
	app.Use(sessions.Sessions("MyDTU", memstore.NewStore([]byte("MyDTU"))))

	//授权检查，启用了SysAdmin的OAuth2，就不能再使用基本HTTP认证了
	//if conf.Config.MyServer.Enable {
	//	//注册OAuth2相关接口
	//	RegisterOauthRoutes(app)
	//}


	//注册前端接口
	api.RegisterRoutes(app.Group("/api"))

	//未登录，访问前端文件，跳转到OAuth2登录
	if conf.Config.MyServer.Enable {
		app.Use(func(c *gin.Context) {
			session := sessions.Default(c)
			if user := session.Get("user"); user != nil {
				c.Next()
			} else {
				//TODO 拼接 OAuth2链接，需要AppKey和Secret
				url := conf.Config.MyServer.Addr + "?redirect_uri=" + urlesc.Escape(c.Request.URL)
				c.Redirect(http.StatusFound, url)
			}
		})
	} else if conf.Config.BaseAuth.Enable {
		//开启基本HTTP认证
		app.Use(gin.BasicAuth(gin.Accounts(conf.Config.BaseAuth.Users)))
	}

	//前端静态文件
	//app.GET("/*any", func(c *gin.Context) {
	app.Use(func(c *gin.Context) {
		if c.Request.Method == http.MethodGet {
			//支持前端框架的无“#”路由
			if c.Request.RequestURI == "/" {
				c.Request.URL.Path = "index.html"
			} else if _, err := wwwFiles.FS.Stat(wwwFiles.CTX, c.Request.RequestURI); err != nil {
				c.Request.URL.Path = "index.html"
			}
			//TODO 如果未登录，则跳转SysAdmin OAuth2自动授权页面

			//文件失效期已经在Handler中处理
			wwwFiles.Handler.ServeHTTP(c.Writer, c.Request)
		}
	})

	//监听HTTP
	if err := app.Run(conf.Config.Web.Addr); err != nil {
		log.Fatal("HTTP 服务启动错误", err)
	}
}
