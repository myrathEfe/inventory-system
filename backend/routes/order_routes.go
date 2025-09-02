package routes

import (
	"github.com/gin-gonic/gin"
	"inventory-system/controllers"
)

func SetupOrderRoutes(r *gin.Engine) {
	r.POST("/create-order", controllers.CreateOrder)
	r.GET("/orders", controllers.GetOrders)
	r.GET("/order/:id", controllers.GetOrderByID)
	r.PUT("/order/:id", controllers.UpdateOrderStatus)
	r.DELETE("/order/:id", controllers.DeleteOrder)
}
