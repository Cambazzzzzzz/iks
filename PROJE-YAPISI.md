# İks - Proje Yapısı

## 📁 Klasör Yapısı

```
Iks/
├── assets/                 # Uygulama ikonları
│   └── icon.ico           # Ana ikon
│
├── data/                   # Database dosyaları
│   └── iks.db             # SQLite database
│
├── public/                 # Frontend dosyaları
│   ├── index.html         # Ana HTML
│   ├── splash.html        # Splash ekranı
│   ├── style.css          # Ana CSS
│   └── app.js             # Ana JavaScript
│
├── uploads/                # Yüklenen medya dosyaları
│   ├── images/            # Fotoğraflar
│   └── videos/            # Videolar
│
├── node_modules/           # NPM bağımlılıkları
│
├── dist/                   # Build çıktıları
│   └── İks Setup.exe      # Windows installer
│
├── electron.js             # Electron ana dosyası
├── server.js               # Express server
├── preload.js              # Electron preload
├── package.json            # NPM yapılandırması
├── .gitignore             # Git ignore
├── start.bat              # Windows başlatma
├── README.md              # Genel bilgi
├── KURULUM.md             # Kurulum rehberi
├── OZELLIKLER.md          # Özellikler listesi
└── PROJE-YAPISI.md        # Bu dosya
```

## 🗂️ Dosya Açıklamaları

### Ana Dosyalar

#### `electron.js`
- Electron uygulamasının ana dosyası
- Pencere oluşturma ve yönetimi
- Server başlatma
- IPC iletişimi

#### `server.js`
- Express.js backend server
- API endpoint'leri
- Database işlemleri
- Dosya yükleme (multer)
- Kimlik doğrulama

#### `preload.js`
- Electron preload script
- Güvenli IPC bridge
- Node.js API'lerine erişim

### Frontend Dosyaları

#### `public/index.html`
- Ana uygulama HTML
- Tüm sayfalar (SPA)
- Modal'lar
- Form'lar

#### `public/splash.html`
- Başlangıç splash ekranı
- Yükleme animasyonu
- Gradient logo

#### `public/style.css`
- Tüm CSS stilleri
- Tema değişkenleri
- Responsive tasarım
- Animasyonlar

#### `public/app.js`
- Tüm JavaScript kodu
- State yönetimi
- API çağrıları
- Event handler'lar
- Routing

## 🎯 Kod Organizasyonu

### JavaScript Modülleri (app.js)

```javascript
// Global State
- currentUser
- selectedMedia
- currentConversation

// Initialization
- checkAuth()
- initEventListeners()

// Authentication
- handleLogin()
- handleRegister()
- logout()

// Navigation
- navigateTo()
- loadUserData()

// Feed
- loadFeed()
- createPostElement()
- postIks()
- likePost()

// Messages
- loadConversations()
- openConversation()
- sendMessage()

// Profile
- loadUserProfile()

// Search
- handleSearch()

// Theme
- changeTheme()
- applyTheme()

// Utilities
- getTimeAgo()
- removeMedia()
```

### CSS Organizasyonu (style.css)

```css
/* Variables */
:root { ... }
body.light-theme { ... }

/* Base Styles */
* { ... }
body { ... }

/* Auth Screen */
.auth-screen { ... }
.auth-container { ... }

/* Main App Layout */
.main-app { ... }

/* Sidebar */
.sidebar { ... }
.nav-item { ... }

/* Main Content */
.main-content { ... }
.page { ... }

/* Feed */
.post { ... }
.post-actions { ... }

/* Messages */
.messages-layout { ... }
.message-bubble { ... }

/* Profile */
.profile-header { ... }

/* Settings */
.settings-container { ... }

/* Right Sidebar */
.right-sidebar { ... }
.widget { ... }

/* Modal */
.modal { ... }

/* Responsive */
@media queries { ... }
```

## 🗄️ Database Şeması

### users
```sql
id              INTEGER PRIMARY KEY
username        TEXT UNIQUE
email           TEXT UNIQUE
password        TEXT (hashed)
display_name    TEXT
bio             TEXT
profile_image   TEXT
cover_image     TEXT
theme           TEXT (dark/light)
created_at      DATETIME
```

### posts
```sql
id              INTEGER PRIMARY KEY
user_id         INTEGER (FK)
content         TEXT
media_url       TEXT
media_type      TEXT (image/video)
likes           INTEGER
retweets        INTEGER
replies         INTEGER
created_at      DATETIME
```

### likes
```sql
id              INTEGER PRIMARY KEY
user_id         INTEGER (FK)
post_id         INTEGER (FK)
created_at      DATETIME
UNIQUE(user_id, post_id)
```

### follows
```sql
id              INTEGER PRIMARY KEY
follower_id     INTEGER (FK)
following_id    INTEGER (FK)
created_at      DATETIME
UNIQUE(follower_id, following_id)
```

### messages
```sql
id              INTEGER PRIMARY KEY
sender_id       INTEGER (FK)
receiver_id     INTEGER (FK)
content         TEXT
read            INTEGER (0/1)
created_at      DATETIME
```

## 🔌 API Endpoints

### Authentication
```
POST   /api/register       - Yeni kullanıcı kaydı
POST   /api/login          - Kullanıcı girişi
```

### Users
```
GET    /api/user/:id       - Kullanıcı bilgisi
PUT    /api/user/:id/theme - Tema güncelleme
```

### Posts
```
GET    /api/posts          - İksleri listele
POST   /api/posts          - Yeni iks paylaş
POST   /api/posts/:id/like - İks beğen/beğenme
```

### Messages
```
GET    /api/messages/:userId              - Sohbet listesi
GET    /api/messages/:userId/:otherUserId - Mesajları getir
POST   /api/messages                      - Mesaj gönder
```

### Search
```
GET    /api/search?q=query - Kullanıcı ara
```

## 🎨 Tasarım Sistemi

### Renkler
```css
/* Dark Theme */
--bg-primary: #000000
--bg-secondary: #16181c
--bg-hover: #1d1f23
--border-color: #2f3336
--text-primary: #e7e9ea
--text-secondary: #71767b
--accent: #1d9bf0

/* Light Theme */
--bg-primary: #ffffff
--bg-secondary: #f7f9f9
--bg-hover: #eff3f4
--border-color: #eff3f4
--text-primary: #0f1419
--text-secondary: #536471
```

### Typography
```css
Font Family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto
Sizes: 13px, 14px, 15px, 17px, 20px, 24px, 32px, 72px, 120px
Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 900 (black)
```

### Spacing
```css
Padding: 5px, 8px, 10px, 12px, 15px, 20px, 40px
Margin: 5px, 10px, 15px, 20px, 30px
Gap: 8px, 10px, 12px, 15px, 20px
Border Radius: 5px, 10px, 15px, 20px, 25px, 30px, 50%
```

### Animations
```css
Transition: all 0.3s ease
Hover: transform, background, color
Loading: bounce, fade, glow
```

## 🔧 Yapılandırma

### package.json
```json
{
  "name": "iks",
  "version": "1.0.0",
  "main": "electron.js",
  "scripts": {
    "start": "electron .",
    "dev": "electron . --dev",
    "build": "electron-builder"
  }
}
```

### Electron Builder
```json
{
  "appId": "com.iks.app",
  "productName": "İks",
  "win": {
    "target": "nsis",
    "icon": "assets/icon.ico"
  }
}
```

## 📦 Bağımlılıklar

### Production
```json
{
  "express": "^4.18.2",
  "sqlite3": "^5.1.6",
  "bcrypt": "^5.1.1",
  "multer": "^1.4.5-lts.1",
  "cors": "^2.8.5"
}
```

### Development
```json
{
  "electron": "^28.0.0",
  "electron-builder": "^24.9.1"
}
```

## 🚀 Build Süreci

### Development
```bash
npm start
# Electron penceresi açılır
# Server localhost:3456'da çalışır
# Hot reload yok (manuel refresh)
```

### Production Build
```bash
npm run build
# dist/ klasörüne build edilir
# Windows: İks Setup.exe
# Installer oluşturulur
# NSIS kullanılır
```

## 🔐 Güvenlik

### Şifre Hashleme
```javascript
bcrypt.hash(password, 10)
bcrypt.compare(password, hash)
```

### SQL Injection Koruması
```javascript
db.run('SELECT * FROM users WHERE id = ?', [userId])
// Prepared statements kullanılır
```

### XSS Koruması
```javascript
// HTML escape
content.replace(/</g, '&lt;').replace(/>/g, '&gt;')
```

### Dosya Yükleme Güvenliği
```javascript
// Multer file filter
// Dosya tipi kontrolü
// Boyut limiti (50MB)
```

## 📊 Performans

### Optimizasyonlar
- Lazy loading (images)
- Debounce (search)
- Pagination (feed)
- Cache (localStorage)
- Minification (production)

### Metrikler
- First Paint: < 1s
- Time to Interactive: < 2s
- Bundle Size: ~2MB
- Database Size: ~10MB

## 🧪 Test

### Manuel Test
1. Kayıt ol
2. Giriş yap
3. İks paylaş
4. Medya yükle
5. Beğen
6. Mesaj gönder
7. Tema değiştir
8. Çıkış yap

### Test Senaryoları
- [ ] Kullanıcı kaydı
- [ ] Kullanıcı girişi
- [ ] İks paylaşma
- [ ] Medya yükleme
- [ ] Beğeni
- [ ] Mesajlaşma
- [ ] Arama
- [ ] Tema değiştirme
- [ ] Profil görüntüleme
- [ ] Çıkış yapma

## 📝 Notlar

### Önemli
- Database otomatik oluşturulur
- Uploads klasörü otomatik oluşturulur
- İlk kullanıcı kayıt olmalı
- Oturum localStorage'da saklanır
- Tema tercihi database'de saklanır

### Bilinen Sorunlar
- Gerçek zamanlı güncelleme yok (manuel refresh gerekli)
- Push notification yok
- Offline mode yok
- PWA desteği yok

### Geliştirme Notları
- ES6+ syntax kullanılır
- Async/await tercih edilir
- Arrow function kullanılır
- Template literals kullanılır
- Modern CSS (Grid, Flexbox)

---

**İks - Kod yapısı ve organizasyon! 📁**
