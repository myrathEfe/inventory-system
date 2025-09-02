package controllers

import (
	"github.com/gin-gonic/gin"
	"inventory-system/config"
	"inventory-system/models"
)

func CreateOrder(c *gin.Context) {
	var order models.Order

	if err := c.ShouldBindJSON(&order); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := config.DB.Create(&order)

	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(201, order)
}

func GetOrders(c *gin.Context) {
	var orders []models.Order
	config.DB.Find(&orders)
	c.JSON(200, orders)
}

func GetOrderByID(c *gin.Context) {
	id := c.Param("id")
	var order models.Order
	result := config.DB.First(&order, id)

	if result.Error != nil {
		c.JSON(404, gin.H{"error": "order not found"})
		return
	}
	c.JSON(200, order)
}

func UpdateOrderStatus(c *gin.Context) {
	id := c.Param("id")
	var order models.Order
	result := config.DB.First(&order, id)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "order not found"})
		return
	}
	var input models.UpdateOrderInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	config.DB.Model(&order).Updates(input)
	c.JSON(200, order)
}

func DeleteOrder(c *gin.Context) {
	id := c.Param("id")
	var order models.Order
	result := config.DB.First(&order, id)
	if result.Error != nil {
		c.JSON(404, gin.H{"error": "order not found"})
		return
	}

	config.DB.Delete(&order)
	c.JSON(200, gin.H{"message": "order deleted"})

}
