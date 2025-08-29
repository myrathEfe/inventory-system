package main

import (
	"github.com/gin-gonic/gin"
	"inventory-system/config"
)

func init() {
	config.ConnectDatabase()
}

func main() {
	r := gin.Default()
	r.Run()
}
