package routes

import (
	"github.com/gin-gonic/gin"
	"inventory-system/controllers"
	"inventory-system/middleware"
)

func SetupOrderRoutes(r *gin.Engine) {
	r.POST("/order", middleware.RequireAuth, controllers.CreateOrder)
	r.GET("/orders", controllers.GetOrders)
	r.GET("/order/:id", controllers.GetOrderByID)
	r.PUT("/order/:id", controllers.UpdateOrderStatus)
	r.DELETE("/order/:id", controllers.DeleteOrder)
}
