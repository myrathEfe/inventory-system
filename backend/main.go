package main

import (
	"github.com/gin-gonic/gin"
	"inventory-system/config"
	"inventory-system/routes"
	"log"
)

func main() {
	config.InitConfig()
	config.ConnectDatabase()

	r := gin.Default()
	routes.SetupAuthRoutes(r)
	routes.SetupProductRoutes(r)
	routes.SetupOrderRoutes(r)

	err := r.Run(":8081")
	if err != nil {
		log.Fatal(err)
	}
}
