package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

var DB *gorm.DB

var JwtSecret = []byte(os.Getenv("JWT_SECRET"))

func ConnectDatabase() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	//.env dosyasından değişkenleri al
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Europe/Istanbul",
		host, user, password, dbname, port,
	)
	//Gorm bağlantısı
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database", err)
	}
	fmt.Println("Database connected successfully!")
}
