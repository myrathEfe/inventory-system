package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"inventory-system/config"
	"inventory-system/routes"
	"log"
	"time"
)

func main() {
	config.InitConfig()
	config.ConnectDatabase()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	routes.SetupAuthRoutes(r)
	routes.SetupProductRoutes(r)
	routes.SetupOrderRoutes(r)

	err := r.Run(":8081")
	if err != nil {
		log.Fatal(err)
	}
}
