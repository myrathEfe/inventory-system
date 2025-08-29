package controllers

import (
	"github.com/gin-gonic/gin"
	"inventory-system/config"
	"inventory-system/models"
)

func CreateProduct(c *gin.Context) {
	var product models.Product

	if err := c.ShouldBindJSON(&product); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	result := config.DB.Create(&product)
	if result.Error != nil {
		c.JSON(500, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(201, product)
}

func GetProducts(c *gin.Context) {
	var products []models.Product
	config.DB.Find(&products)
	c.IndentedJSON(200, products)
}

func GetProductByID(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	result := config.DB.First(&product, id)

	if result.Error != nil {
		c.JSON(404, gin.H{"error": "Product not found"})
		return
	}
	c.JSON(200, product)
}

func UpdateProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	result := config.DB.First(&product, id)

	if result.Error != nil {
		c.JSON(404, gin.H{"error": "Product not found"})
		return
	}

	var input models.UpdateProductInput
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	config.DB.Model(&product).Updates(input)
	c.JSON(200, product)
}

func DeleteProduct(c *gin.Context) {
	id := c.Param("id")
	var product models.Product
	result := config.DB.First(&product, id)

	if result.Error != nil {
		c.JSON(404, gin.H{"error": "Product not found"})
		return
	}

	config.DB.Delete(&product)
	c.JSON(200, gin.H{"message": "Product deleted"})

}
