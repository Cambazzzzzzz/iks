# İks - Railway Deployment Rehberi

## 🚀 Railway'e Deploy Etme

### 1. GitHub'a Push

```bash
cd Iks
git init
git add .
git commit -m "Initial commit - İks sosyal medya platformu"
git branch -M main
git remote add origin https://github.com/byoshhii-netizen/iks.git
git push -u origin main
```

### 2. Railway'de Proje Oluşturma

1. [Railway.app](https://railway.app) adresine git
2. "New Project" tıkla
3. "Deploy from GitHub repo" seç
4. `byoshhii-netizen/iks` repository'sini seç
5. Railway otomatik deploy edecek

### 3. Environment Variables (Opsiyonel)

Railway dashboard'da şu değişkenleri ekleyebilirsin:

```env
PORT=3456
NODE_ENV=production
DATABASE_PATH=/app/data/iks.db
```

### 4. Domain Ayarlama

1. Railway dashboard'da "Settings" > "Domains"
2. "Generate Domain" tıkla
3. Otomatik domain oluşturulacak (örn: `iks-production.up.railway.app`)

## 📝 Önemli Notlar

### Database
- Railway'de SQLite kullanılıyor
- Her deploy'da database sıfırlanabilir
- Production için PostgreSQL önerilir

### Uploads
- Yüklenen dosyalar geçici
- Her deploy'da silinebilir
- Production için cloud storage (Cloudinary, S3) önerilir

### Port
- Railway otomatik PORT atar
- `process.env.PORT` kullanılıyor
- Manuel port ayarlamaya gerek yok

## 🔧 Railway Yapılandırması

### nixpacks.toml
```toml
[phases.setup]
nixPkgs = ['nodejs_20', 'python3']

[phases.install]
cmds = ['npm ci']

[start]
cmd = 'node server.js'
```

### railway.json
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "node server.js"
  }
}
```

## 🌐 Web Versiyonu

Railway'de deploy edilen versiyon **web versiyonu**dur:
- Electron özellikleri çalışmaz
- Sadece web tarayıcıdan erişilir
- Server.js standalone çalışır

### Electron vs Web

**Electron (Desktop):**
```bash
npm run electron
```

**Web (Railway):**
```bash
npm start
# veya
node server.js
```

## 📱 Kullanım

### Railway URL'si
Deploy sonrası Railway size bir URL verecek:
```
https://iks-production.up.railway.app
```

Bu URL'yi tarayıcıda aç ve kullan!

### İlk Kullanım
1. Railway URL'sini aç
2. Kayıt ol
3. Giriş yap
4. İks paylaş!

## 🔄 Güncelleme

```bash
# Değişiklikleri yap
git add .
git commit -m "Güncelleme mesajı"
git push

# Railway otomatik yeniden deploy eder
```

## 🐛 Sorun Giderme

### Logs Görüntüleme
Railway dashboard'da "Deployments" > "View Logs"

### Database Hatası
```bash
# Railway'de data klasörü oluşturulur
# Otomatik handle edilir
```

### Port Hatası
```bash
# Railway otomatik PORT atar
# Kod zaten process.env.PORT kullanıyor
```

## 🎯 Production İyileştirmeleri

### 1. PostgreSQL Kullan
```bash
# Railway'de PostgreSQL ekle
# Database kodunu güncelle
```

### 2. Cloud Storage
```bash
# Cloudinary veya S3 entegre et
# Multer yerine cloud upload kullan
```

### 3. Redis Cache
```bash
# Railway'de Redis ekle
# Session ve cache için kullan
```

### 4. Environment Variables
```env
DATABASE_URL=postgresql://...
CLOUDINARY_URL=cloudinary://...
REDIS_URL=redis://...
SESSION_SECRET=random-secret-key
```

## 📊 Railway Özellikleri

### Ücretsiz Plan
- 500 saat/ay
- 512MB RAM
- 1GB disk
- Otomatik SSL
- Custom domain

### Pro Plan
- Sınırsız saat
- Daha fazla RAM
- Daha fazla disk
- Priority support

## 🔐 Güvenlik

### Production Checklist
- [ ] SESSION_SECRET değiştir
- [ ] CORS ayarlarını güncelle
- [ ] Rate limiting ekle
- [ ] HTTPS kullan (Railway otomatik)
- [ ] Environment variables kullan

## 📚 Kaynaklar

- [Railway Docs](https://docs.railway.app)
- [Nixpacks](https://nixpacks.com)
- [Node.js Deployment](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## 🎉 Başarılı Deploy!

Railway'e deploy ettikten sonra:
1. ✅ URL'yi al
2. ✅ Tarayıcıda aç
3. ✅ Kayıt ol
4. ✅ İks paylaş!

---

**İks - Railway'de çalışıyor! 🚀**
