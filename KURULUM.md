# İks - Kurulum Rehberi

## Hızlı Başlangıç

### Windows için:
1. `start.bat` dosyasına çift tıklayın
2. İlk çalıştırmada bağımlılıklar otomatik yüklenecek
3. Uygulama otomatik başlayacak

### Manuel Kurulum:

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Uygulamayı başlat
npm start
```

## İlk Kullanım

1. Uygulama açıldığında kayıt ekranı gelecek
2. **Kayıt Ol** sekmesinden yeni hesap oluşturun:
   - Kullanıcı adı
   - Email
   - Görünen ad
   - Şifre
3. Kayıt olduktan sonra **Giriş Yap** sekmesinden giriş yapın
4. Artık uygulamayı kullanabilirsiniz!

## Özellikler

### 🏠 Ana Sayfa
- Tüm iksleri görüntüle
- Yeni iks paylaş
- Fotoğraf/video yükle
- Beğen, yorum yap

### 🔍 Keşfet
- Kullanıcı ara
- Trendleri gör
- Yeni insanlar keşfet

### 💬 Mesajlar
- Diğer kullanıcılarla mesajlaş
- Gerçek zamanlı sohbet
- Mesaj geçmişi

### 👤 Profil
- Kendi ikslerini gör
- Profil bilgilerini düzenle
- Takipçi/takip edilen sayısı

### ⚙️ Ayarlar
- **Tema değiştir**: Koyu/Açık tema
- Bildirim ayarları
- Gizlilik ayarları

## Önemli Notlar

### Oturum Yönetimi
- İlk giriş yaptıktan sonra oturum açık kalır
- Çıkış yapmadığınız sürece tekrar giriş yapmanız gerekmez
- Oturum bilgileri güvenli şekilde saklanır

### Hashtag Kullanımı
- # işareti ile başlayan kelimeler otomatik mavi renkte görünür
- Örnek: `#teknoloji #yapayZeka #kodlama`

### Medya Yükleme
- Desteklenen formatlar: JPG, PNG, GIF, MP4, MOV, AVI, WEBM
- Maksimum dosya boyutu: 50MB
- Hem fotoğraf hem video yükleyebilirsiniz

### Tema Sistemi
- **Koyu Tema**: Varsayılan, göz yormayan siyah-beyaz tasarım
- **Açık Tema**: Aydınlık ortamlar için beyaz tasarım
- Tema tercihiniz otomatik kaydedilir

## Navigasyon

### Sol Menü (Sidebar)
- 🏠 Ana Sayfa
- 🔍 Keşfet
- 🔔 Bildirimler
- 💬 Mesajlar
- 🔖 Yer İşaretleri
- 👤 Profil
- ⚙️ Ayarlar

### Sağ Panel
- Trendler
- Kimi takip etmeli
- Arama kutusu

## Kısayollar

- **Yeni İks**: Sol menüdeki "Yeni İks" butonuna tıklayın
- **Medya Ekle**: 🖼️ ikonuna tıklayarak fotoğraf/video ekleyin
- **Hashtag**: # işareti ile başlayın
- **Arama**: Üst kısımdaki arama kutusunu kullanın

## Sorun Giderme

### Uygulama açılmıyor
```bash
# Node modüllerini temizle ve tekrar yükle
rm -rf node_modules
npm install
npm start
```

### Database hatası
- `data` klasörünü kontrol edin
- Klasör yoksa otomatik oluşturulacak

### Port hatası (3456 kullanımda)
- `server.js` dosyasında PORT değişkenini değiştirin
- Başka bir port numarası kullanın

## Geliştirme

### Development Mode
```bash
npm run dev
```

### Build (Kurulum dosyası oluştur)
```bash
npm run build
```

Build sonrası `dist` klasöründe kurulum dosyası oluşur.

## Sistem Gereksinimleri

- **Node.js**: v16 veya üzeri
- **npm**: v8 veya üzeri
- **İşletim Sistemi**: Windows, macOS, Linux
- **RAM**: Minimum 4GB
- **Disk**: 500MB boş alan

## Güvenlik

- Şifreler bcrypt ile hashlenir
- Oturum bilgileri güvenli şekilde saklanır
- SQL injection koruması
- XSS koruması

## Destek

Sorun yaşarsanız:
1. README.md dosyasını okuyun
2. GitHub Issues'da sorun bildirin
3. Loglara bakın (console)

## Güncellemeler

```bash
# Güncellemeleri kontrol et
git pull

# Bağımlılıkları güncelle
npm update

# Uygulamayı yeniden başlat
npm start
```

---

**İyi Eğlenceler! 🚀**
