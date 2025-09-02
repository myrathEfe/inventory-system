package models

import "time"

type User struct {
	ID       uint   `gorm:"primaryKey" json:"id"`
	Name     string `gorm:"size:100;not null" json:"name"`
	Email    string `gorm:"uniqueIndex;size:100;not null" json:"email"`
	Password string `gorm:"not null" json:"-"`
	Role     string `gorm:"default:user" json:"role"`

	CreatedAt time.Time `json:"created_at"`
	Updatedat time.Time `json:"updated_at"`
}

type RegisterInput struct {
	Name     string `json:"name" binding:"required"`
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type LoginInput struct {
	Email    string `json:"email" binding:"required"`
	Password string `json:"password" binding:"required"`
}

//gorm : DB icin
//json : API icin
