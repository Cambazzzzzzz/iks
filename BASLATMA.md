# İks - Başlatma Rehberi

## 🚀 Hızlı Başlangıç

### Windows Kullanıcıları
```bash
# Çift tıklayın:
start.bat
```

### Diğer İşletim Sistemleri
```bash
npm start
```

## ✅ Kontrol Listesi

### Kurulum Öncesi
- [ ] Node.js yüklü mü? (v16+)
- [ ] npm yüklü mü? (v8+)
- [ ] 500MB boş disk alanı var mı?
- [ ] Port 3456 boş mu?

### İlk Kurulum
```bash
# 1. Klasöre git
cd Iks

# 2. Bağımlılıkları yükle
npm install

# 3. Uygulamayı başlat
npm start
```

## 📋 İlk Kullanım Adımları

### 1. Kayıt Ol
- Uygulamayı aç
- "Kayıt Ol" sekmesine tıkla
- Bilgileri doldur:
  - Kullanıcı adı (benzersiz)
  - Email (geçerli)
  - Görünen ad
  - Şifre (güçlü)
- "Kayıt Ol" butonuna tıkla

### 2. Giriş Yap
- "Giriş Yap" sekmesine geç
- Kullanıcı adı veya email
- Şifre
- "Giriş Yap" butonuna tıkla

### 3. İlk İksini Paylaş
- Ana sayfada "Ne düşünüyorsun?" kutusuna tıkla
- Mesajını yaz
- İsteğe bağlı: Fotoğraf/video ekle
- "İksle" butonuna tıkla

### 4. Keşfet
- Sol menüden "Keşfet"e tıkla
- Arama kutusunu kullan
- Kullanıcıları bul
- Takip et

### 5. Mesajlaş
- Sol menüden "Mesajlar"a tıkla
- Bir kullanıcı seç
- Mesaj yaz
- Gönder

### 6. Temayı Değiştir
- Sol menüden "Ayarlar"a tıkla
- Tema bölümünü bul
- "Koyu" veya "Açık" seç
- Otomatik kaydedilir

## 🎯 Özellik Turu

### Ana Sayfa (🏠)
- Tüm iksleri gör
- Yeni iks paylaş
- Beğen, yorum yap
- Medya yükle

### Keşfet (🔍)
- Kullanıcı ara
- Trendleri gör
- Yeni insanlar keşfet
- Hashtag'leri takip et

### Bildirimler (🔔)
- Beğeni bildirimleri
- Yorum bildirimleri
- Takip bildirimleri
- Mention bildirimleri

### Mesajlar (💬)
- Direkt mesajlaşma
- Sohbet geçmişi
- Gerçek zamanlı
- Medya paylaşımı

### Yer İşaretleri (🔖)
- Kayıtlı iksler
- Hızlı erişim
- Kategori filtreleme

### Profil (👤)
- Kendi profilin
- İkslerini gör
- Bilgilerini düzenle
- İstatistikleri gör

### Ayarlar (⚙️)
- Tema değiştir
- Hesap ayarları
- Gizlilik ayarları
- Bildirim ayarları

## 💡 İpuçları

### Hashtag Kullanımı
```
#teknoloji #yapayZeka #kodlama
```
- # ile başla
- Boşluk kullanma
- Türkçe karakter kullanabilirsin
- Otomatik mavi renkte görünür

### Medya Yükleme
- 📷 Fotoğraf: JPG, PNG, GIF
- 🎥 Video: MP4, MOV, AVI, WEBM
- 📏 Maksimum: 50MB
- 👁️ Önizleme: Otomatik

### Kısayollar
- **Yeni İks**: Sol menü "Yeni İks" butonu
- **Arama**: Üst kısım arama kutusu
- **Profil**: Sol menü "Profil" butonu
- **Çıkış**: Sol alt köşe çıkış butonu

## 🔧 Sorun Giderme

### Uygulama Açılmıyor
```bash
# Node modüllerini temizle
rm -rf node_modules
npm install
npm start
```

### Port Hatası
```javascript
// server.js dosyasında
const PORT = 3456; // Başka bir port dene: 3457, 3458, vb.
```

### Database Hatası
```bash
# data klasörünü kontrol et
ls data/

# Yoksa oluştur
mkdir data
```

### Beyaz Ekran
```bash
# Cache temizle
# Uygulamayı kapat
# Tekrar başlat
npm start
```

## 📊 Sistem Durumu

### Kontrol Et
```bash
# Node.js versiyonu
node --version  # v16+ olmalı

# npm versiyonu
npm --version   # v8+ olmalı

# Port kontrolü
netstat -an | grep 3456
```

### Logları Gör
```bash
# Terminal'de loglar görünür
# Hata varsa burada görünür
# Console.log mesajları
```

## 🎨 Özelleştirme

### Tema Renkleri
```css
/* style.css dosyasında */
:root {
    --accent: #1d9bf0;  /* Mavi vurgu rengi */
    /* Değiştir ve kaydet */
}
```

### Logo
```
1. assets/icon.ico dosyasını değiştir
2. 256x256px ICO formatı
3. Uygulamayı yeniden başlat
```

## 📱 Mobil Görünüm

### Responsive
- Desktop: > 1200px
- Tablet: 900px - 1200px
- Mobile: < 900px

### Mobile Özellikler
- Alt navigasyon
- Hamburger menü
- Touch gestures
- Swipe navigation

## 🔐 Güvenlik

### Şifre
- Minimum 6 karakter
- Büyük/küçük harf
- Rakam içermeli
- Özel karakter önerilir

### Oturum
- Otomatik açık kalır
- Güvenli şekilde saklanır
- Çıkış yapana kadar aktif
- Çoklu cihaz desteği

## 📈 Performans

### Optimizasyon
- Lazy loading
- Image compression
- Cache kullanımı
- Debounce search

### Hız
- Sayfa yükleme: < 2s
- İks paylaşma: < 1s
- Arama: < 500ms
- Mesaj: < 500ms

## 🆘 Yardım

### Dokümantasyon
- README.md - Genel bilgi
- KURULUM.md - Detaylı kurulum
- OZELLIKLER.md - Tüm özellikler
- PROJE-YAPISI.md - Kod yapısı

### Destek
- GitHub Issues
- Email desteği
- Topluluk forumu
- Discord sunucusu

## ✨ İlk Adımlar Özeti

1. ✅ Uygulamayı başlat (`npm start`)
2. ✅ Kayıt ol (benzersiz kullanıcı adı)
3. ✅ Giriş yap (kullanıcı adı + şifre)
4. ✅ İlk iksini paylaş (metin + medya)
5. ✅ Kullanıcıları keşfet (arama)
6. ✅ Takip et (ilginç profiller)
7. ✅ Mesajlaş (direkt mesaj)
8. ✅ Temayı değiştir (koyu/açık)
9. ✅ Profilini düzenle (bio, fotoğraf)
10. ✅ Keyfini çıkar! 🎉

## 🎯 Sonraki Adımlar

### Öğren
- [ ] Hashtag kullanımı
- [ ] Medya yükleme
- [ ] Mesajlaşma
- [ ] Profil düzenleme
- [ ] Arama özellikleri

### Keşfet
- [ ] Trendleri takip et
- [ ] Yeni kullanıcılar bul
- [ ] İlginç içerikler keşfet
- [ ] Toplulukla etkileşim

### Paylaş
- [ ] Düzenli iks paylaş
- [ ] Medya içerikleri ekle
- [ ] Hashtag'leri kullan
- [ ] Etkileşimde bulun

---

**İyi Eğlenceler! 🚀**

**İks - Modern sosyal medya deneyimi!**
