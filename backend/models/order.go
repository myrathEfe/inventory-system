package models

import "time"

type Order struct {
	ID        uint      `gorm:"primaryKey" json:"id"`
	UserID    uint      `gorm:"not null" json:"user_id"`
	User      User      `json:"user"`
	Status    string    `gorm:"default:'pending'" json:"status"` // pending | preparing | completed | cancelled
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	Products  []Product `gorm:"many2many:order_products;" json:"products"`
}
