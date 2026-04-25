# İks - Railway Volume Kurulumu

## 🎯 Amaç

Railway'de deploy yaparken database ve uploads'ların silinmemesi için volume kullanacağız.

## 📦 Volume Nedir?

Volume, Railway'de kalıcı depolama alanıdır. Her deploy'da silinmez, verileriniz korunur.

## 🚀 Kurulum Adımları

### 1. Railway'de Proje Oluştur

```bash
# Railway CLI yükle (opsiyonel)
npm install -g @railway/cli

# Veya web üzerinden
# https://railway.app
```

### 2. GitHub'dan Deploy Et

1. Railway'e giriş yap: https://railway.app
2. "New Project" tıkla
3. "Deploy from GitHub repo" seç
4. `Cambazzzzzzz/iks` repository'sini seç
5. Deploy başlayacak

### 3. Volume Ekle

#### Railway Dashboard'dan:

1. Projeye git
2. **"Variables"** sekmesine tıkla
3. **"Add Volume"** butonuna tıkla
4. Volume ayarları:
   - **Mount Path**: `/data`
   - **Name**: `iks-data`
5. **"Add Volume"** tıkla

### 4. Environment Variables Ekle

**Variables** sekmesinde şunları ekle:

```env
# Railway otomatik ekler
PORT=3456

# Volume için
RAILWAY_VOLUME_MOUNT_PATH=/data
DATABASE_PATH=/data/data/iks.db

# Node environment
NODE_ENV=production
```

### 5. Deploy Tekrar Başlat

Volume eklendikten sonra:
1. **"Deployments"** sekmesine git
2. **"Redeploy"** tıkla
3. Veya yeni commit push'la

## 📁 Dosya Yapısı (Railway'de)

```
/app/                    # Uygulama kodu
├── public/
├── server.js
└── ...

/data/                   # Volume (kalıcı)
├── data/
│   └── iks.db          # Database
└── uploads/            # Yüklenen medya
    ├── image1.jpg
    └── video1.mp4
```

## ✅ Doğrulama

Deploy sonrası kontrol et:

### 1. Logs'u İzle

Railway Dashboard > **Deployments** > **View Logs**

Şunu görmeli:
```
Database bağlantısı başarılı: /data/data/iks.db
İks server çalışıyor: http://0.0.0.0:3456
```

### 2. Test Et

1. Uygulamayı aç
2. Kayıt ol ve giriş yap
3. Bir iks paylaş (fotoğrafla)
4. Yeni deploy yap (git push)
5. **Veriler kaybolmamalı!** ✅

## 🔧 Sorun Giderme

### Volume Çalışmıyor

**Kontrol et:**
```env
RAILWAY_VOLUME_MOUNT_PATH=/data
```

**Logs'da bak:**
```
Database bağlantısı başarılı: /data/data/iks.db
```

### Database Bulunamıyor

**Environment variables kontrol:**
- `RAILWAY_VOLUME_MOUNT_PATH` var mı?
- `DATABASE_PATH` doğru mu?

**Çözüm:**
```env
DATABASE_PATH=/data/data/iks.db
```

### Uploads Kayboldu

**Kontrol et:**
- Volume mount path doğru mu?
- Uploads klasörü volume içinde mi?

**Logs'da bak:**
```
Uploads path: /data/uploads
```

## 📊 Volume Boyutu

Railway Free Plan:
- **1GB** volume (ücretsiz)
- Yeterli olmalı başlangıç için

Daha fazla gerekirse:
- Pro Plan'e geç
- Veya medya için Cloudinary kullan

## 🎯 Önemli Notlar

### ✅ Volume İçinde Olmalı:
- `data/iks.db` - Database
- `uploads/` - Yüklenen medya

### ❌ Volume İçinde Olmamalı:
- `node_modules/` - Her deploy'da yüklenir
- `public/` - Statik dosyalar
- Kod dosyaları

## 🔄 Backup

### Manuel Backup

Railway Dashboard'dan:
1. **"Data"** sekmesi
2. **"Download Volume"** tıkla
3. ZIP indirilir

### Otomatik Backup (Gelecek)

```javascript
// Günlük backup scripti eklenebilir
// Örnek: S3'e yedekleme
```

## 🚀 Production Checklist

Deploy öncesi kontrol:

- [ ] Volume eklendi (`/data`)
- [ ] Environment variables ayarlandı
- [ ] `RAILWAY_VOLUME_MOUNT_PATH=/data`
- [ ] `DATABASE_PATH=/data/data/iks.db`
- [ ] `NODE_ENV=production`
- [ ] GitHub repo bağlandı
- [ ] Deploy başarılı
- [ ] Logs kontrol edildi
- [ ] Test edildi (kayıt, giriş, iks paylaş)
- [ ] Yeni deploy sonrası veriler korundu

## 📝 Örnek Deploy Komutu

```bash
# Local'de test
npm start

# Git push (otomatik deploy)
git add .
git commit -m "Volume desteği eklendi"
git push origin main

# Railway otomatik deploy eder
```

## 🎉 Sonuç

Artık Railway'de deploy yaptığında:
- ✅ Database korunur
- ✅ Uploads korunur
- ✅ Her deploy'da veriler kaybolmaz
- ✅ Kullanıcılar ve iksler kalıcı

## 🔗 Faydalı Linkler

- Railway Docs: https://docs.railway.app
- Volume Docs: https://docs.railway.app/reference/volumes
- İks GitHub: https://github.com/Cambazzzzzzz/iks

---

**Not**: Volume eklendikten sonra ilk deploy biraz uzun sürebilir. Sabırlı ol!
