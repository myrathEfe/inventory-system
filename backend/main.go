package main

import (
	"github.com/gin-gonic/gin"
	"inventory-system/config"
	"inventory-system/routes"
	"log"
)

func init() {
	config.ConnectDatabase()
}

func main() {
	r := gin.Default()
	routes.SetupAuthRoutes(r)
	routes.SetupProductRoutes(r)
	routes.SetupOrderRoutes(r)
	err := r.Run(":8080")
	if err != nil {
		log.Fatal(err)
	}
}
