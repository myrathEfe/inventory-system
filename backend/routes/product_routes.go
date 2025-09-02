package routes

import (
	"github.com/gin-gonic/gin"
	"inventory-system/controllers"
	"inventory-system/middleware"
)

func SetupProductRoutes(r *gin.Engine) {
	r.GET("/product/:id", controllers.GetProductByID)
	r.GET("/products", controllers.GetProducts)
	r.POST("/product", middleware.RequireAuth, controllers.CreateProduct) // auth gerekli
	r.PUT("/product/:id", middleware.RequireAuth, controllers.UpdateProduct)
	r.DELETE("/product/:id", middleware.RequireAuth, controllers.DeleteProduct)
}
