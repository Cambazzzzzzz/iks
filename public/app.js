// Global state
let currentUser = null;
let selectedMedia = null;
let currentConversation = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    initEventListeners();
});

// Check authentication
function checkAuth() {
    const savedUser = localStorage.getItem('iksUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showMainApp();
        loadUserData();
        loadFeed();
    } else {
        showAuthScreen();
    }
}

function showAuthScreen() {
    document.getElementById('authScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
}

function showMainApp() {
    document.getElementById('authScreen').style.display = 'none';
    document.getElementById('mainApp').style.display = 'grid';
}

// Event Listeners
function initEventListeners() {
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });

    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Register form
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const route = item.dataset.route;
            navigateTo(route);
        });
    });

    // New Iks
    document.getElementById('newIksBtn').addEventListener('click', () => {
        document.getElementById('newIksModal').classList.add('active');
    });

    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('newIksModal').classList.remove('active');
    });

    document.getElementById('postIksBtn').addEventListener('click', postIks);
    document.getElementById('modalPostBtn').addEventListener('click', postIksFromModal);

    // Media upload
    document.getElementById('mediaUpload').addEventListener('change', handleMediaUpload);
    document.getElementById('modalMediaUpload').addEventListener('change', handleModalMediaUpload);

    // Theme toggle
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const theme = btn.dataset.theme;
            changeTheme(theme);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);

    // Search
    document.getElementById('searchInput').addEventListener('input', handleSearch);
}

// Auth handlers
async function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            localStorage.setItem('iksUser', JSON.stringify(data.user));
            showMainApp();
            loadUserData();
            loadFeed();
        } else {
            alert(data.error || 'Giriş başarısız');
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Giriş yapılırken bir hata oluştu');
    }
}

async function handleRegister(e) {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const email = document.getElementById('regEmail').value;
    const display_name = document.getElementById('regDisplayName').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, display_name, password })
        });

        const data = await response.json();
        
        if (data.success) {
            alert('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
            document.querySelector('[data-tab="login"]').click();
        } else {
            alert(data.error || 'Kayıt başarısız');
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Kayıt olurken bir hata oluştu');
    }
}

function logout() {
    localStorage.removeItem('iksUser');
    currentUser = null;
    showAuthScreen();
}

// Navigation
function navigateTo(route) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`[data-route="${route}"]`).classList.add('active');
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(route + 'Page').classList.add('active');

    // Load page specific data
    switch(route) {
        case 'home':
            loadFeed();
            break;
        case 'messages':
            loadConversations();
            break;
        case 'profile':
            loadUserProfile();
            break;
    }
}

// Load user data
function loadUserData() {
    if (!currentUser) return;

    // Update sidebar user info
    const sidebarUser = document.getElementById('sidebarUser');
    sidebarUser.querySelector('.user-name').textContent = currentUser.display_name;
    sidebarUser.querySelector('.user-username').textContent = '@' + currentUser.username;
    
    if (currentUser.profile_image) {
        sidebarUser.querySelector('.user-avatar').src = currentUser.profile_image;
    }

    // Apply saved theme
    if (currentUser.theme) {
        applyTheme(currentUser.theme);
    }
}

// Feed functions
async function loadFeed() {
    try {
        const response = await fetch('/api/posts');
        const posts = await response.json();
        
        const feedContainer = document.getElementById('feedContainer');
        feedContainer.innerHTML = '';

        if (posts.length === 0) {
            feedContainer.innerHTML = '<div class="empty-state"><i class="fas fa-comment"></i><p>Henüz hiç iks yok. İlk iksi sen at!</p></div>';
            return;
        }

        posts.forEach(post => {
            feedContainer.appendChild(createPostElement(post));
        });
    } catch (error) {
        console.error('Feed load error:', error);
    }
}

function createPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.dataset.postId = post.id;

    const timeAgo = getTimeAgo(post.created_at);
    
    // Process hashtags
    const processedContent = post.content.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');

    postDiv.innerHTML = `
        <img src="${post.profile_image || 'https://via.placeholder.com/48'}" alt="Profile" class="post-avatar">
        <div class="post-content">
            <div class="post-header">
                <span class="post-name">${post.display_name}</span>
                <span class="post-username">@${post.username}</span>
                <span class="post-time">· ${timeAgo}</span>
            </div>
            <div class="post-text">${processedContent}</div>
            ${post.media_url ? `
                <div class="post-media">
                    ${post.media_type === 'video' 
                        ? `<video controls><source src="${post.media_url}" type="video/mp4"></video>`
                        : `<img src="${post.media_url}" alt="Post media">`
                    }
                </div>
            ` : ''}
            <div class="post-actions">
                <button class="post-action">
                    <i class="far fa-comment"></i>
                    <span>${post.replies || 0}</span>
                </button>
                <button class="post-action">
                    <i class="fas fa-retweet"></i>
                    <span>${post.retweets || 0}</span>
                </button>
                <button class="post-action like-btn" data-post-id="${post.id}">
                    <i class="far fa-heart"></i>
                    <span>${post.likes || 0}</span>
                </button>
                <button class="post-action">
                    <i class="far fa-bookmark"></i>
                </button>
            </div>
        </div>
    `;

    // Like button handler
    postDiv.querySelector('.like-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        likePost(post.id);
    });

    return postDiv;
}

async function postIks() {
    const content = document.getElementById('newIksText').value.trim();
    
    if (!content && !selectedMedia) {
        alert('İks içeriği boş olamaz!');
        return;
    }

    const formData = new FormData();
    formData.append('user_id', currentUser.id);
    formData.append('content', content);
    
    if (selectedMedia) {
        formData.append('media', selectedMedia);
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('newIksText').value = '';
            document.getElementById('mediaPreview').innerHTML = '';
            selectedMedia = null;
            loadFeed();
        } else {
            alert('İks paylaşılamadı');
        }
    } catch (error) {
        console.error('Post error:', error);
        alert('İks paylaşılırken bir hata oluştu');
    }
}

async function postIksFromModal() {
    const content = document.getElementById('modalIksText').value.trim();
    
    if (!content && !selectedMedia) {
        alert('İks içeriği boş olamaz!');
        return;
    }

    const formData = new FormData();
    formData.append('user_id', currentUser.id);
    formData.append('content', content);
    
    if (selectedMedia) {
        formData.append('media', selectedMedia);
    }

    try {
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('modalIksText').value = '';
            document.getElementById('modalMediaPreview').innerHTML = '';
            selectedMedia = null;
            document.getElementById('newIksModal').classList.remove('active');
            loadFeed();
        } else {
            alert('İks paylaşılamadı');
        }
    } catch (error) {
        console.error('Post error:', error);
        alert('İks paylaşılırken bir hata oluştu');
    }
}

function handleMediaUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    selectedMedia = file;
    const preview = document.getElementById('mediaPreview');
    const reader = new FileReader();

    reader.onload = (e) => {
        const isVideo = file.type.startsWith('video');
        preview.innerHTML = `
            ${isVideo 
                ? `<video controls><source src="${e.target.result}" type="${file.type}"></video>`
                : `<img src="${e.target.result}" alt="Preview">`
            }
            <button class="remove-media" onclick="removeMedia()">×</button>
        `;
    };

    reader.readAsDataURL(file);
}

function handleModalMediaUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    selectedMedia = file;
    const preview = document.getElementById('modalMediaPreview');
    const reader = new FileReader();

    reader.onload = (e) => {
        const isVideo = file.type.startsWith('video');
        preview.innerHTML = `
            ${isVideo 
                ? `<video controls><source src="${e.target.result}" type="${file.type}"></video>`
                : `<img src="${e.target.result}" alt="Preview">`
            }
            <button class="remove-media" onclick="removeMedia('modal')">×</button>
        `;
    };

    reader.readAsDataURL(file);
}

function removeMedia(type = 'main') {
    selectedMedia = null;
    if (type === 'modal') {
        document.getElementById('modalMediaPreview').innerHTML = '';
        document.getElementById('modalMediaUpload').value = '';
    } else {
        document.getElementById('mediaPreview').innerHTML = '';
        document.getElementById('mediaUpload').value = '';
    }
}

async function likePost(postId) {
    try {
        const response = await fetch(`/api/posts/${postId}/like`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: currentUser.id })
        });

        const data = await response.json();
        
        if (data.success) {
            loadFeed();
        }
    } catch (error) {
        console.error('Like error:', error);
    }
}

// Messages
async function loadConversations() {
    try {
        const response = await fetch(`/api/messages/${currentUser.id}`);
        const conversations = await response.json();
        
        const container = document.getElementById('conversationsList');
        container.innerHTML = '<div class="page-header"><h1>Mesajlar</h1></div>';

        conversations.forEach(conv => {
            const convDiv = document.createElement('div');
            convDiv.className = 'conversation-item';
            convDiv.innerHTML = `
                <img src="${conv.profile_image || 'https://via.placeholder.com/40'}" alt="Profile" class="user-avatar">
                <div class="user-info">
                    <div class="user-name">${conv.display_name}</div>
                    <div class="user-username">${conv.last_message || ''}</div>
                </div>
            `;
            convDiv.addEventListener('click', () => openConversation(conv.other_user_id, conv));
            container.appendChild(convDiv);
        });
    } catch (error) {
        console.error('Conversations load error:', error);
    }
}

async function openConversation(userId, userData) {
    currentConversation = userId;
    
    // Update header
    const header = document.getElementById('messageHeader');
    header.style.display = 'flex';
    header.querySelector('.user-name').textContent = userData.display_name;
    header.querySelector('.user-avatar').src = userData.profile_image || 'https://via.placeholder.com/40';

    // Show input
    document.getElementById('messageInput').style.display = 'flex';

    // Load messages
    try {
        const response = await fetch(`/api/messages/${currentUser.id}/${userId}`);
        const messages = await response.json();
        
        const container = document.getElementById('messagesContainer');
        container.innerHTML = '';

        messages.forEach(msg => {
            const msgDiv = document.createElement('div');
            msgDiv.className = `message-bubble ${msg.sender_id === currentUser.id ? 'message-sent' : 'message-received'}`;
            msgDiv.textContent = msg.content;
            container.appendChild(msgDiv);
        });

        container.scrollTop = container.scrollHeight;
    } catch (error) {
        console.error('Messages load error:', error);
    }

    // Send message handler
    document.getElementById('sendMessageBtn').onclick = sendMessage;
    document.getElementById('newMessageText').onkeypress = (e) => {
        if (e.key === 'Enter') sendMessage();
    };
}

async function sendMessage() {
    const content = document.getElementById('newMessageText').value.trim();
    if (!content || !currentConversation) return;

    try {
        const response = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender_id: currentUser.id,
                receiver_id: currentConversation,
                content: content
            })
        });

        const data = await response.json();
        
        if (data.success) {
            document.getElementById('newMessageText').value = '';
            // Reload conversation
            const userData = { display_name: document.querySelector('#messageHeader .user-name').textContent };
            openConversation(currentConversation, userData);
        }
    } catch (error) {
        console.error('Send message error:', error);
    }
}

// Profile
async function loadUserProfile() {
    try {
        const response = await fetch(`/api/posts?user_id=${currentUser.id}`);
        const posts = await response.json();
        
        // Update profile info
        document.querySelector('.profile-name').textContent = currentUser.display_name;
        document.querySelector('.profile-username').textContent = '@' + currentUser.username;
        document.querySelector('.profile-bio').textContent = currentUser.bio || 'Bio henüz eklenmedi';
        
        if (currentUser.profile_image) {
            document.querySelector('.profile-avatar').src = currentUser.profile_image;
        }

        // Load user posts
        const container = document.getElementById('userPostsContainer');
        container.innerHTML = '';

        if (posts.length === 0) {
            container.innerHTML = '<div class="empty-state"><i class="fas fa-comment"></i><p>Henüz hiç iks paylaşmadın</p></div>';
            return;
        }

        posts.forEach(post => {
            container.appendChild(createPostElement(post));
        });
    } catch (error) {
        console.error('Profile load error:', error);
    }
}

// Search
let searchTimeout;
async function handleSearch(e) {
    const query = e.target.value.trim();
    
    clearTimeout(searchTimeout);
    
    if (query.length < 2) {
        document.getElementById('searchResults').innerHTML = '';
        return;
    }

    searchTimeout = setTimeout(async () => {
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const users = await response.json();
            
            const container = document.getElementById('searchResults');
            container.innerHTML = '';

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.className = 'user-result';
                userDiv.innerHTML = `
                    <img src="${user.profile_image || 'https://via.placeholder.com/40'}" alt="Profile" class="user-avatar">
                    <div class="user-info">
                        <div class="user-name">${user.display_name}</div>
                        <div class="user-username">@${user.username}</div>
                    </div>
                `;
                container.appendChild(userDiv);
            });
        } catch (error) {
            console.error('Search error:', error);
        }
    }, 300);
}

// Theme
function changeTheme(theme) {
    applyTheme(theme);
    
    // Save to database
    if (currentUser) {
        fetch(`/api/user/${currentUser.id}/theme`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ theme })
        });
        
        currentUser.theme = theme;
        localStorage.setItem('iksUser', JSON.stringify(currentUser));
    }
}

function applyTheme(theme) {
    document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
    
    if (theme === 'light') {
        document.body.classList.add('light-theme');
    } else {
        document.body.classList.remove('light-theme');
    }
}

// Utility functions
function getTimeAgo(timestamp) {
    const now = new Date();
    const past = new Date(timestamp);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Şimdi';
    if (diffMins < 60) return `${diffMins}d`;
    if (diffHours < 24) return `${diffHours}s`;
    if (diffDays < 7) return `${diffDays}g`;
    
    return past.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });
}
