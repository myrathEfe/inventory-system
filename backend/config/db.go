package config

import (
	"fmt"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"inventory-system/models"
	"log"
	"os"
)

var DB *gorm.DB

var JwtSecret []byte

func InitConfig() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
	JwtSecret = []byte(os.Getenv("JWT_SECRET"))
}

func ConnectDatabase() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	dbname := os.Getenv("DB_NAME")

	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Europe/Istanbul",
		host, user, password, dbname, port,
	)
	fmt.Println("ENV DB_HOST =", os.Getenv("DB_HOST"))
	fmt.Println("🔎 DSN = ", dsn)

	var err error
	// GORM ile bağlan
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect database", err)
	}
	fmt.Println("✅ Database connected successfully!")

	// migrate et
	err = DB.AutoMigrate(&models.User{}, &models.Product{}, &models.Order{})
	if err != nil {
		log.Fatal("❌ Migration failed:", err)
	}
	fmt.Println("✅ Database migrated successfully!")

}
