# 🛒 E-Ticaret Yönetim Sistemi

Bu proje, **Go (Golang)** ile yazılmış bir backend ve **React + Vite + Tailwind** ile geliştirilmiş bir frontend içerir.  
Amaç: **Ürün ve Sipariş Yönetimi** için temel bir panel oluşturmak.

## 🚀 Özellikler

- 🔐 **Kimlik Doğrulama (Auth)**: JWT tabanlı login/register sistemi  
- 📦 **Ürün Yönetimi**: Ürün ekleme, güncelleme, silme, listeleme  
- 🛍 **Sipariş Yönetimi**: Sipariş oluşturma, ürünleri siparişe ekleme, durum güncelleme  
- 📊 **Dashboard**: Özet bilgiler  
- 🎨 **Modern UI**: React, TailwindCSS, Lucide icon seti  
- 🐳 **Docker Compose**: PostgreSQL + Backend + Frontend container tabanlı kurulum  

---

## 📂 Proje Yapısı

inventory-system/
│── backend/ (Go API)
│ ├── controllers/ # İş mantığı (CRUD işlemleri)
│ ├── middleware/ # Auth middleware
│ ├── models/ # GORM modelleri
│ ├── routes/ # API endpoint tanımları
│ ├── main.go # Uygulama giriş noktası
│
│── frontend/ (React + Vite)
│ ├── src/
│ │ ├── components/ # UI bileşenleri (Login, Register, Products, Orders, Dashboard, Navbar)
│ │ ├── context/ # AuthContext
│ │ ├── services/ # API servisleri (axios)
│ │ ├── App.jsx # Router
│ │ ├── index.jsx # Entry point
│ │
│ ├── public/ # Statik dosyalar
│ ├── vite.config.js # Vite config
│
│── docker-compose.yml # PostgreSQL + Backend + Frontend
│── Dockerfile # Backend Dockerfile
│── README.md
│── .env.example

---

## 🛠 Kullanılan Teknolojiler

### Backend
- [Golang](https://golang.org/) (Gin framework + GORM ORM)
- [PostgreSQL](https://www.postgresql.org/) (veritabanı)
- [JWT](https://jwt.io/) (kimlik doğrulama)

### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/icons/)

### DevOps
- [Docker](https://www.docker.com/) & Docker Compose

---

## ⚙️ Kurulum

### 1. Klonla
git clone https://github.com/kullanici/inventory-system.git
cd inventory-system
2. Ortam Değişkenleri
.env.example dosyasını kopyalayıp .env olarak düzenle:
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventorydb
JWT_SECRET=supersecretkey
3. Docker Compose ile Çalıştır
docker-compose up --build
Backend: http://localhost:8081
Frontend: http://localhost:3000
PostgreSQL: port 5432
📌 API Endpointleri (Backend)
Auth
POST /register → Kullanıcı kaydı
POST /login → Giriş (JWT döner)
Products
GET /products → Tüm ürünleri getir
GET /product/:id → ID’ye göre ürün getir
POST /product → Ürün oluştur (Auth gerekli)
PUT /product/:id → Ürün güncelle (Auth gerekli)
DELETE /product/:id → Ürün sil (Auth gerekli)
Orders
GET /orders → Siparişleri getir
POST /order → Sipariş oluştur (Auth gerekli)
PUT /order/:id → Sipariş güncelle (durum değiştir)
DELETE /order/:id → Sipariş sil
👤 Kullanıcı Rolleri
Normal kullanıcı → ürün/sipariş listeleme
Giriş yapmış kullanıcı → ürün ekleme, güncelleme, sipariş oluşturma
Admin (ileride) → tüm sistem yönetimi
