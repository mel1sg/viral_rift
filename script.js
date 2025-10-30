// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Создаем эффект матрицы на заднем фоне
    createMatrixEffect();
    
    // Добавляем эффект печатающего текста
    addTypingEffect();
    
    // Добавляем анимации при скролле
    addScrollAnimations();
    
    // Добавляем эффект загрузки для ссылок
    addLoadingEffect();
    
    // Добавляем эффект глитча для заголовков
    addGlitchEffect();
});

// Эффект матрицы
function createMatrixEffect() {
    const matrixBg = document.createElement('div');
    matrixBg.className = 'matrix-bg';
    document.body.appendChild(matrixBg);
    
    const canvas = document.createElement('canvas');
    matrixBg.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const characters = '01';
    const charArray = characters.split('');
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height / fontSize);
    }
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 10, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 35);
    
    // Ресайз канваса при изменении размера окна
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Эффект печатающего текста
function addTypingEffect() {
    const elements = document.querySelectorAll('h1, h2, .terminal-text');
    
    elements.forEach(element => {
        const originalText = element.textContent;
        element.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                element.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            } else {
                // Добавляем мигающий курсор после завершения
                const cursor = document.createElement('span');
                cursor.className = 'cursor';
                cursor.textContent = '_';
                element.appendChild(cursor);
            }
        };
        
        // Запускаем с небольшой задержкой для драматического эффекта
        setTimeout(typeWriter, 500);
    });
}

// Анимации при скролле
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Анимируем карточки заданий
    const taskCards = document.querySelectorAll('.tasks-grid a');
    taskCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
    // Анимируем секции описания
    const sections = document.querySelectorAll('.task-description, .download-section, .image-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(section);
    });
}

// Эффект загрузки для ссылок
function addLoadingEffect() {
    const downloadLinks = document.querySelectorAll('.download-section a, .audio-section a');
    
    downloadLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const originalText = this.textContent;
            this.innerHTML = '<span class="loading"></span> Загрузка...';
            
            // Восстанавливаем текст через 2 секунды (на случай если загрузка не началась)
            setTimeout(() => {
                this.textContent = originalText;
            }, 2000);
        });
    });
}

// Эффект глитча для заголовков
function addGlitchEffect() {
    const glitchElements = document.querySelectorAll('h1, h2');
    
    glitchElements.forEach(element => {
        element.classList.add('glitch');
        
        // Случайный глитч каждые 10 секунд
        setInterval(() => {
            if (Math.random() > 0.7) {
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitch 0.3s linear';
                }, 10);
            }
        }, 10000);
    });
}

// Эффект сканирования для хедера
function addHeaderScanEffect() {
    const header = document.querySelector('header');
    let scanPosition = 0;
    
    function scan() {
        scanPosition = (scanPosition + 1) % 100;
        header.style.background = `linear-gradient(135deg, #001a00 0%, #003300 ${scanPosition}%, #001a00 100%)`;
        requestAnimationFrame(scan);
    }
    
    // Медленное сканирование
    setInterval(() => {
        scan();
    }, 100);
}

// Инициализация сканирования хедера
addHeaderScanEffect();