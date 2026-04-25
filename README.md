# İks - Modern Sosyal Medya Platformu

Twitter/X benzeri modern ve lüks tasarımlı sosyal medya uygulaması.

## Özellikler

✨ **Modern Tasarım**
- Koyu/Açık tema desteği
- Lüks gradient efektleri
- Responsive tasarım
- Smooth animasyonlar

📱 **Temel Özellikler**
- Kullanıcı kayıt ve giriş sistemi
- İks (post) paylaşma
- Fotoğraf ve video yükleme
- Beğeni sistemi
- Hashtag desteği (#hashtag mavi renkte görünür)
- Mesajlaşma sistemi
- Kullanıcı profilleri
- Arama özelliği
- Bildirimler
- Yer işaretleri

🎨 **Tasarım Özellikleri**
- Sidebar navigasyon
- Ana sayfa feed
- Keşfet sayfası
- Mesajlar sayfası
- Profil sayfası
- Ayarlar sayfası
- Sağ sidebar (trendler ve öneriler)

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
cd Iks
npm install
```

2. Uygulamayı başlatın:
```bash
npm start
```

## Geliştirme

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Teknolojiler

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express
- **Database**: SQLite3
- **Desktop**: Electron
- **Upload**: Multer

## Özellikler Detay

### Tema Sistemi
- Koyu tema (varsayılan)
- Açık tema
- Ayarlar sayfasından değiştirilebilir
- Kullanıcı bazlı kayıt

### Oturum Yönetimi
- İlk giriş sonrası otomatik oturum
- Çıkış yapana kadar oturum açık kalır
- LocalStorage ile oturum yönetimi

### Hashtag Sistemi
- # ile başlayan kelimeler otomatik mavi renkte
- Tıklanabilir hashtag'ler

### Medya Yükleme
- Fotoğraf yükleme
- Video yükleme
- Önizleme özelliği
- 50MB'a kadar dosya desteği

## Lisans

MIT
