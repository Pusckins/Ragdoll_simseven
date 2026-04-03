document.addEventListener('DOMContentLoaded', () => {
    const content = document.getElementById('dynamic-content');

    const pages = {
        about: `
            <div class="content-section">
                <h1>О породе Регдолл</h1>
                <p>Регдоллы — это удивительные создания, известные как "нежные гиганты". Свое название они получили за способность моментально расслабляться, когда их берут на руки. Это одна из самых популярных пород в мире для семей с детьми.</p>
                <div class="info-grid">
                    <div class="card">
                        <h4>💎 Особенности</h4>
                        <p>У регдоллов полудлинная, шелковистая шерсть, которая почти не путается, и всегда бездонно-голубые глаза.</p>
                    </div>
                    <div class="card">
                        <h4>🧠 Характер</h4>
                        <p>Они обладают собачьим складом ума: привязываются к человеку, а не к дому, и легко обучаются простым командам.</p>
                    </div>
                </div>
                <div class="card" style="margin-top:15px; border-left: 5px solid var(--accent);">
                    <h4>Миролюбие</h4>
                    <p>Они лишены инстинкта агрессии. Если их обидеть, они скорее уйдут и спрячутся, чем выпустят когти.</p>
                </div>
            </div>`,
            
        care: `
            <div class="content-section">
                <h2>Уход и содержание</h2>
                <p>Несмотря на роскошную внешность, регдоллы не требуют сложного груминга, но есть важные правила для их здоровья.</p>
                <div class="card">
                    <h4>🥣 Питание</h4>
                    <p>Из-за крупного размера им нужен корм высокого качества (холистик) с контролем веса, так как порода склонна к полноте.</p>
                </div>
                <div class="card" style="margin-top:15px;">
                    <h4>🧶 Шерсть и гигиена</h4>
                    <p>Расчесывайте их 2 раза в неделю. Шерсть у них особенная — она не сваливается в колтуны, так как почти не имеет подшерстка.</p>
                </div>
                <div class="card" style="margin-top:15px;">
                    <h4>🏠 Безопасность</h4>
                    <p>Это исключительно домашние кошки. У них замедленные реакции, поэтому улица для них крайне опасна.</p>
                </div>
            </div>`,

        gallery: `
            <h2>Галерея</h2>
            <div class="gallery-grid">
                <div class="gallery-item" style="background-image:url('img/cat1.jpg')"></div>
                <div class="gallery-item" style="background-image:url('img/cat2.jpg')"></div>
                <div class="gallery-item" style="background-image:url('img/cat3.jpg')"></div>
                <div class="gallery-item" style="background-image:url('img/cat4.jpg')"></div>
                <div class="gallery-item" style="background-image:url('img/cat5.jpg')"></div>
                <div class="gallery-item" style="background-image:url('img/cat6.jpg')"></div>
            </div>`,

        contacts: `
            <div class="content-section">
                <h2>Где мы находимся</h2>
                <p>Мы всегда рады гостям в нашем питомнике в Колодищах. Пожалуйста, согласуйте визит заранее.</p>
                <p><i class="fas fa-map-marker-alt"></i> <b>Беларусь, Минская обл., аг. Колодищи</b></p>
                <div class="map-container">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d18790.347514292887!2d27.76635835!3d53.94276785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46dbceda4928b80b%3A0x7d6f5f903930869!2z0JrQvtC70L7QtNC40YnQuCwg0JHQtdC70LDRgNGD0YHRjA!5e0!3m2!1sru!2sru!4v1712140000000" allowfullscreen="" loading="lazy"></iframe>
                </div>
            </div>`
    };

    function load(id) {
        const key = id.replace('nav-', '');
        content.innerHTML = pages[key] || pages.about;
        document.querySelectorAll('.nav-item').forEach(btn => btn.classList.remove('active'));
        document.getElementById(id).classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.onclick = (e) => { e.preventDefault(); load(btn.id); };
    });

    // ПОЧИНЕННЫЙ ЛАЙК
    const likeBtn = document.getElementById('like-trigger');
    const likeCount = document.getElementById('like-count');
    let isLiked = false;

    if (likeBtn) {
        likeBtn.onclick = () => {
            isLiked = !isLiked;
            likeBtn.classList.toggle('active');
            likeCount.innerText = isLiked ? '125' : '124';
        };
    }

    // ТЕМА
    const themeBtn = document.getElementById('theme-btn');
    if (themeBtn) {
        themeBtn.onclick = () => {
            document.body.classList.toggle('dark-mode');
            // Сохраняем выбор пользователя
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        };
    }
    
    // Проверка сохраненной темы
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }

    // МОДАЛКА
    const modal = document.getElementById('photo-modal');
    document.addEventListener('click', e => {
        if(e.target.classList.contains('gallery-item')) {
            const url = e.target.style.backgroundImage.slice(5,-2).replace(/"/g,"");
            document.getElementById('full-img').src = url;
            modal.classList.add('active');
        }
    });
    modal.onclick = () => modal.classList.remove('active');

    // СТАТУС ВРЕМЕНИ
    const updateStatus = () => {
        const h = new Date().getHours();
        const led = document.getElementById('status-led');
        const label = document.getElementById('status-label');
        if (h >= 10 && h < 21) {
            led.style.background = '#2ecc71';
            led.style.boxShadow = '0 0 8px #2ecc71';
            label.innerText = 'СЕЙЧАС ОТКРЫТО';
        } else {
            led.style.background = '#e74c3c';
            led.style.boxShadow = '0 0 8px #e74c3c';
            label.innerText = 'СЕЙЧАС ЗАКРЫТО';
        }
    };
    updateStatus();
    load('nav-about');
});