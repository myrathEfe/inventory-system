# E-Ticaret Frontend Projesi

Modern React tabanlı e-ticaret yönetim paneli frontend uygulaması.

## 🚀 Özellikler

- **Modern React 18** - En güncel React özellikleri
- **Tailwind CSS** - Responsive ve modern tasarım
- **JWT Authentication** - Güvenli kullanıcı girişi
- **Protected Routes** - Yetkilendirme tabanlı sayfa erişimi
- **CRUD Operations** - Ürün ve sipariş yönetimi
- **Real-time Updates** - Anlık veri güncellemeleri
- **Toast Notifications** - Kullanıcı bildirimleri
- **Responsive Design** - Mobil uyumlu arayüz

## 🛠️ Teknolojiler

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **State Management:** React Context API
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## 📦 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd frontend
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
```
http://localhost:3000
```

## 🏗️ Proje Yapısı

```
frontend/
├── public/                 # Statik dosyalar
├── src/
│   ├── components/        # React bileşenleri
│   │   ├── Navbar.jsx    # Navigasyon çubuğu
│   │   ├── Login.jsx     # Giriş sayfası
│   │   ├── Register.jsx  # Kayıt sayfası
│   │   ├── Dashboard.jsx # Ana dashboard
│   │   ├── Products.jsx  # Ürün yönetimi
│   │   ├── Orders.jsx    # Sipariş yönetimi
│   │   ├── ProductForm.jsx # Ürün formu
│   │   └── OrderForm.jsx # Sipariş formu
│   ├── context/          # React Context
│   │   └── AuthContext.jsx # Kimlik doğrulama context'i
│   ├── services/         # API servisleri
│   │   └── api.js       # Axios wrapper
│   ├── App.jsx          # Ana uygulama bileşeni
│   ├── index.js         # Giriş noktası
│   └── index.css        # Ana CSS dosyası
├── package.json          # Proje bağımlılıkları
├── tailwind.config.js    # Tailwind yapılandırması
├── vite.config.js        # Vite yapılandırması
├── Dockerfile            # Docker yapılandırması
└── docker-compose.yml    # Docker Compose yapılandırması
```

## 🔐 API Entegrasyonu

### Backend Endpoints
- **Base URL:** `http://localhost:8081`
- **Auth:** `/register`, `/login`
- **Products:** `/products`, `/product/:id`
- **Orders:** `/orders`, `/order/:id`

### JWT Token Yönetimi
- Token localStorage'da saklanır
- Otomatik request header'a eklenir
- 401 hatasında otomatik logout

## 🎨 Kullanıcı Arayüzü

### Sayfalar
1. **Login/Register** - Kullanıcı girişi ve kaydı
2. **Dashboard** - Genel istatistikler ve hızlı erişim
3. **Products** - Ürün CRUD işlemleri
4. **Orders** - Sipariş yönetimi ve durum güncelleme

### Responsive Tasarım
- Mobil öncelikli tasarım
- Tailwind CSS ile modern görünüm
- Icon tabanlı navigasyon
- Toast bildirimleri

## 🚀 Production Build

### Build Komutu
```bash
npm run build
```

### Preview
```bash
npm run preview
```

## 🐳 Docker Deployment

### Docker Build
```bash
docker build -t ecommerce-frontend .
```

### Docker Compose
```bash
docker-compose up -d
```

### Environment Variables
```env
REACT_APP_API_URL=http://localhost:8081
```

## 📱 Responsive Breakpoints

- **Mobile:** < 768px
- **Tablet:** 768px - 1024px  
- **Desktop:** > 1024px

## 🔧 Geliştirme

### Scripts
- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run preview` - Build önizleme

### Code Style
- ESLint kuralları
- Prettier formatı
- Component bazlı yapı
- Hook tabanlı state yönetimi

## 🚨 Hata Yönetimi

- API hatalarında toast bildirimleri
- Loading states
- Error boundaries
- Network error handling

## 🔒 Güvenlik

- JWT token validation
- Protected routes
- Input validation
- XSS protection
- CSRF protection

## 📊 Performans

- Code splitting
- Lazy loading
- Optimized images
- Gzip compression
- Browser caching

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 📞 İletişim

- **Proje:** [GitHub Repository](https://github.com/username/ecommerce-frontend)
- **Issues:** [GitHub Issues](https://github.com/username/ecommerce-frontend/issues)

## 🙏 Teşekkürler

- React ekibi
- Tailwind CSS ekibi
- Vite ekibi
- Tüm open source katkıda bulunanlar
