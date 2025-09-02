package routes

import (
	"github.com/gin-gonic/gin"
	"inventory-system/controllers"
)

func SetupAuthRoutes(r *gin.Engine) {
	r.POST("/login", controllers.Login)
	r.POST("/register", controllers.Register)
}
