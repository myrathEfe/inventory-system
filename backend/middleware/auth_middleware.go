package middleware

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"inventory-system/config"
	"net/http"
	"strings"
)

func RequireAuth(c *gin.Context) {
	authHeader := c.GetHeader("Authorization")
	fmt.Println("👉 Authorization Header:", authHeader)

	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		c.Abort()
		return
	}

	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		fmt.Println("❌ Invalid token format:", parts)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
		c.Abort()
		return
	}

	tokenString := parts[1]
	fmt.Println("🔑 TokenString:", tokenString)

	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return config.JwtSecret, nil
	})

	if err != nil {
		fmt.Println("❌ Token parse error:", err)
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		c.Abort()
		return
	}

	if !token.Valid {
		fmt.Println("❌ Token not valid")
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
		c.Abort()
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		fmt.Println("✅ Claims:", claims)
		c.Set("user_id", claims["user_id"])
		c.Set("role", claims["role"])
	}

	c.Next()
}
