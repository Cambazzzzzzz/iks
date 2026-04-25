# GitHub'a Push Etme Rehberi

## 🔐 Authentication Gerekli

GitHub'a push etmek için authentication yapman gerekiyor.

## Yöntem 1: Personal Access Token (Önerilen)

### 1. GitHub Token Oluştur
1. GitHub'da Settings > Developer settings > Personal access tokens > Tokens (classic)
2. "Generate new token (classic)" tıkla
3. Note: "Iks Deploy"
4. Expiration: 90 days (veya istediğin)
5. Scopes: **repo** seç (tüm repo yetkisi)
6. "Generate token" tıkla
7. Token'ı kopyala (bir daha göremezsin!)

### 2. Token ile Push Et
```bash
cd Iks

# Remote'u token ile güncelle
git remote set-url origin https://TOKEN@github.com/byoshhii-netizen/iks.git

# TOKEN yerine kopyaladığın token'ı yapıştır
# Örnek: https://ghp_xxxxxxxxxxxxxxxxxxxx@github.com/byoshhii-netizen/iks.git

# Push et
git push -u origin main
```

## Yöntem 2: SSH Key (Daha Güvenli)

### 1. SSH Key Oluştur
```bash
# SSH key oluştur
ssh-keygen -t ed25519 -C "byoshhii@netizen.com"

# Enter tuşuna bas (varsayılan konum)
# Passphrase iste(me)rsen boş bırak

# Public key'i kopyala
cat ~/.ssh/id_ed25519.pub
```

### 2. GitHub'a SSH Key Ekle
1. GitHub'da Settings > SSH and GPG keys
2. "New SSH key" tıkla
3. Title: "Iks Deploy"
4. Key: Kopyaladığın public key'i yapıştır
5. "Add SSH key" tıkla

### 3. SSH ile Push Et
```bash
cd Iks

# Remote'u SSH ile güncelle
git remote set-url origin git@github.com:byoshhii-netizen/iks.git

# Push et
git push -u origin main
```

## Yöntem 3: GitHub CLI (En Kolay)

### 1. GitHub CLI Yükle
```bash
# Windows (winget)
winget install GitHub.cli

# veya Chocolatey
choco install gh
```

### 2. Login ve Push
```bash
# GitHub'a login ol
gh auth login

# Tarayıcıda authentication yap

# Push et
cd Iks
git push -u origin main
```

## 🚀 Push Sonrası

Push başarılı olduktan sonra:

1. ✅ GitHub repository'sine git: https://github.com/byoshhii-netizen/iks
2. ✅ Dosyaların yüklendiğini kontrol et
3. ✅ Railway'e deploy et

## 🌐 Railway Deploy

### 1. Railway'e Git
https://railway.app

### 2. Yeni Proje Oluştur
1. "New Project" tıkla
2. "Deploy from GitHub repo" seç
3. "byoshhii-netizen/iks" seç
4. Railway otomatik deploy edecek

### 3. Domain Al
1. Railway dashboard'da "Settings" > "Domains"
2. "Generate Domain" tıkla
3. URL'yi kopyala (örn: iks-production.up.railway.app)

### 4. Test Et
1. Railway URL'sini tarayıcıda aç
2. Kayıt ol
3. Giriş yap
4. İks paylaş!

## 🔄 Güncelleme

Değişiklik yaptıktan sonra:

```bash
cd Iks
git add .
git commit -m "Güncelleme mesajı"
git push

# Railway otomatik yeniden deploy eder
```

## 🐛 Sorun Giderme

### "Permission denied" Hatası
- Token veya SSH key doğru mu kontrol et
- Token'ın repo yetkisi var mı kontrol et
- SSH key GitHub'a eklenmiş mi kontrol et

### "Repository not found" Hatası
- Repository adı doğru mu: `byoshhii-netizen/iks`
- Repository public mi private mı kontrol et
- GitHub hesabına erişimin var mı kontrol et

### "Authentication failed" Hatası
- Token süresi dolmuş olabilir
- Yeni token oluştur
- veya SSH key kullan

## 📝 Notlar

- Token'ı güvenli bir yerde sakla
- Token'ı kimseyle paylaşma
- SSH key daha güvenli
- GitHub CLI en kolay yöntem

## 🎯 Hızlı Komutlar

```bash
# Token ile (TOKEN'ı değiştir)
git remote set-url origin https://TOKEN@github.com/byoshhii-netizen/iks.git
git push -u origin main

# SSH ile
git remote set-url origin git@github.com:byoshhii-netizen/iks.git
git push -u origin main

# GitHub CLI ile
gh auth login
git push -u origin main
```

---

**İyi şanslar! 🚀**
