const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3456;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload klasörünü oluştur
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// Multer yapılandırması
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|mp4|mov|avi|webm/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Sadece resim ve video dosyaları yüklenebilir!'));
    }
});

// Database path - Railway uyumlu
const dbPath = process.env.DATABASE_PATH || './data/iks.db';
const dbDir = path.dirname(dbPath);

// Database klasörünü oluştur
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

// Database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Database bağlantı hatası:', err);
    } else {
        console.log('Database bağlantısı başarılı:', dbPath);
        initDatabase();
    }
});

function initDatabase() {
    db.serialize(() => {
        // Kullanıcılar tablosu
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            display_name TEXT NOT NULL,
            bio TEXT,
            profile_image TEXT,
            cover_image TEXT,
            theme TEXT DEFAULT 'dark',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);

        // İksler (postlar) tablosu
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            media_url TEXT,
            media_type TEXT,
            likes INTEGER DEFAULT 0,
            retweets INTEGER DEFAULT 0,
            replies INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`);

        // Beğeniler tablosu
        db.run(`CREATE TABLE IF NOT EXISTS likes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            post_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            FOREIGN KEY (post_id) REFERENCES posts(id),
            UNIQUE(user_id, post_id)
        )`);

        // Takip tablosu
        db.run(`CREATE TABLE IF NOT EXISTS follows (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            follower_id INTEGER NOT NULL,
            following_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (follower_id) REFERENCES users(id),
            FOREIGN KEY (following_id) REFERENCES users(id),
            UNIQUE(follower_id, following_id)
        )`);

        // Mesajlar tablosu
        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            sender_id INTEGER NOT NULL,
            receiver_id INTEGER NOT NULL,
            content TEXT NOT NULL,
            read INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (sender_id) REFERENCES users(id),
            FOREIGN KEY (receiver_id) REFERENCES users(id)
        )`);
    });
}

// AUTH ROUTES
app.post('/api/register', async (req, res) => {
    const { username, email, password, display_name } = req.body;
    
    if (!username || !email || !password || !display_name) {
        return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        db.run(
            'INSERT INTO users (username, email, password, display_name) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, display_name],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE')) {
                        return res.status(400).json({ error: 'Kullanıcı adı veya email zaten kullanılıyor' });
                    }
                    return res.status(500).json({ error: 'Kayıt hatası' });
                }
                res.json({ 
                    success: true, 
                    userId: this.lastID,
                    message: 'Kayıt başarılı' 
                });
            }
        );
    } catch (error) {
        res.status(500).json({ error: 'Sunucu hatası' });
    }
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, username], async (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Sunucu hatası' });
        }
        
        if (!user) {
            return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Hatalı şifre' });
        }
        
        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                display_name: user.display_name,
                bio: user.bio,
                profile_image: user.profile_image,
                cover_image: user.cover_image,
                theme: user.theme
            }
        });
    });
});

// USER ROUTES
app.get('/api/user/:id', (req, res) => {
    db.get('SELECT id, username, display_name, bio, profile_image, cover_image, created_at FROM users WHERE id = ?', 
        [req.params.id], (err, user) => {
        if (err) return res.status(500).json({ error: 'Sunucu hatası' });
        if (!user) return res.status(404).json({ error: 'Kullanıcı bulunamadı' });
        res.json(user);
    });
});

app.put('/api/user/:id/theme', (req, res) => {
    const { theme } = req.body;
    db.run('UPDATE users SET theme = ? WHERE id = ?', [theme, req.params.id], (err) => {
        if (err) return res.status(500).json({ error: 'Tema güncellenemedi' });
        res.json({ success: true });
    });
});

// POST ROUTES
app.post('/api/posts', upload.single('media'), (req, res) => {
    const { user_id, content } = req.body;
    const media_url = req.file ? `/uploads/${req.file.filename}` : null;
    const media_type = req.file ? (req.file.mimetype.startsWith('video') ? 'video' : 'image') : null;
    
    db.run(
        'INSERT INTO posts (user_id, content, media_url, media_type) VALUES (?, ?, ?, ?)',
        [user_id, content, media_url, media_type],
        function(err) {
            if (err) return res.status(500).json({ error: 'İks paylaşılamadı' });
            res.json({ success: true, postId: this.lastID });
        }
    );
});

app.get('/api/posts', (req, res) => {
    const { user_id } = req.query;
    
    let query = `
        SELECT p.*, u.username, u.display_name, u.profile_image,
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) as likes,
        (SELECT COUNT(*) FROM posts WHERE id = p.id) as retweets
        FROM posts p
        JOIN users u ON p.user_id = u.id
    `;
    
    if (user_id) {
        query += ` WHERE p.user_id = ${user_id}`;
    }
    
    query += ' ORDER BY p.created_at DESC LIMIT 50';
    
    db.all(query, (err, posts) => {
        if (err) return res.status(500).json({ error: 'İksler yüklenemedi' });
        res.json(posts);
    });
});

app.post('/api/posts/:id/like', (req, res) => {
    const { user_id } = req.body;
    const post_id = req.params.id;
    
    db.run('INSERT INTO likes (user_id, post_id) VALUES (?, ?)', [user_id, post_id], (err) => {
        if (err) {
            if (err.message.includes('UNIQUE')) {
                // Unlike
                db.run('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [user_id, post_id], (err) => {
                    if (err) return res.status(500).json({ error: 'Beğeni kaldırılamadı' });
                    res.json({ success: true, action: 'unliked' });
                });
            } else {
                return res.status(500).json({ error: 'Beğeni eklenemedi' });
            }
        } else {
            res.json({ success: true, action: 'liked' });
        }
    });
});

// MESSAGES ROUTES
app.get('/api/messages/:userId', (req, res) => {
    const userId = req.params.userId;
    
    db.all(`
        SELECT DISTINCT 
            CASE 
                WHEN sender_id = ? THEN receiver_id 
                ELSE sender_id 
            END as other_user_id,
            u.username, u.display_name, u.profile_image,
            (SELECT content FROM messages 
             WHERE (sender_id = ? AND receiver_id = other_user_id) 
                OR (sender_id = other_user_id AND receiver_id = ?)
             ORDER BY created_at DESC LIMIT 1) as last_message,
            (SELECT created_at FROM messages 
             WHERE (sender_id = ? AND receiver_id = other_user_id) 
                OR (sender_id = other_user_id AND receiver_id = ?)
             ORDER BY created_at DESC LIMIT 1) as last_message_time
        FROM messages m
        JOIN users u ON u.id = CASE 
            WHEN m.sender_id = ? THEN m.receiver_id 
            ELSE m.sender_id 
        END
        WHERE sender_id = ? OR receiver_id = ?
        ORDER BY last_message_time DESC
    `, [userId, userId, userId, userId, userId, userId, userId, userId], (err, conversations) => {
        if (err) return res.status(500).json({ error: 'Mesajlar yüklenemedi' });
        res.json(conversations);
    });
});

app.get('/api/messages/:userId/:otherUserId', (req, res) => {
    const { userId, otherUserId } = req.params;
    
    db.all(`
        SELECT m.*, u.username, u.display_name, u.profile_image
        FROM messages m
        JOIN users u ON m.sender_id = u.id
        WHERE (sender_id = ? AND receiver_id = ?) 
           OR (sender_id = ? AND receiver_id = ?)
        ORDER BY created_at ASC
    `, [userId, otherUserId, otherUserId, userId], (err, messages) => {
        if (err) return res.status(500).json({ error: 'Mesajlar yüklenemedi' });
        res.json(messages);
    });
});

app.post('/api/messages', (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    
    db.run(
        'INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)',
        [sender_id, receiver_id, content],
        function(err) {
            if (err) return res.status(500).json({ error: 'Mesaj gönderilemedi' });
            res.json({ success: true, messageId: this.lastID });
        }
    );
});

// SEARCH
app.get('/api/search', (req, res) => {
    const { q } = req.query;
    
    db.all(`
        SELECT id, username, display_name, profile_image, bio
        FROM users
        WHERE username LIKE ? OR display_name LIKE ?
        LIMIT 20
    `, [`%${q}%`, `%${q}%`], (err, users) => {
        if (err) return res.status(500).json({ error: 'Arama yapılamadı' });
        res.json(users);
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`İks server çalışıyor: http://0.0.0.0:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
