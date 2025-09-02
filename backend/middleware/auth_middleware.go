package middleware

import (
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"inventory-system/config"
	"net/http"
	"strings"
)

func RequireAuth(c *gin.Context) {
	// 1. Authorization header al
	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		c.Abort()
		return
	}

	// 2. "Bearer <token>" formatını parçala
	parts := strings.Split(authHeader, " ")
	if len(parts) != 2 || parts[0] != "Bearer" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
		c.Abort()
		return
	}
	tokenString := parts[1]

	// 3. Token’ı çöz
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return config.JwtSecret, nil
	})

	if err != nil || !token.Valid {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
		c.Abort()
		return
	}

	// 4. Claims’leri context’e koy
	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		c.Set("user_id", claims["user_id"])
		c.Set("role", claims["role"])
	}

	// 5. Devam et
	c.Next()
}
