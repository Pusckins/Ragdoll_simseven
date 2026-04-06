document.addEventListener('DOMContentLoaded', () => {
    // 1. Тема
    const themeBtn = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerText = '☀️';
    }

    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        themeBtn.innerText = isDark ? '☀️' : '🌙';
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // 2. Бургер
    const burger = document.getElementById('burger');
    const navMenu = document.getElementById('nav-menu');
    burger.addEventListener('click', () => navMenu.classList.toggle('active'));

    // 3. Вкладки
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            navLinks.forEach(l => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            link.classList.add('active');
            document.getElementById(target).classList.add('active');
            navMenu.classList.remove('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 4. Лайки
    const likeBtn = document.querySelector('.like-button');
    let likes = 124;
    let isLiked = false;
    likeBtn.addEventListener('click', () => {
        isLiked = !isLiked;
        likes = isLiked ? likes + 1 : likes - 1;
        document.getElementById('like-count').innerText = likes;
        likeBtn.style.background = isLiked ? '#ff4757' : 'rgba(255,255,255,0.2)';
    });

    // 5. Галерея
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightbox.classList.add('active');
            lightboxImg.src = img.src;
        });
    });
    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));
});