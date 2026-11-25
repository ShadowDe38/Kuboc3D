// Ждем полной загрузки DOM перед инициализацией
document.addEventListener('DOMContentLoaded', () => {
    const viewer = document.getElementById('trophyViewer');
    const tabs = document.querySelectorAll('.model-tab');
    const modelName = document.getElementById('modelName');
    const animControls = document.getElementById('animControls');
    
    // Ссылки на кнопки управления
    const camReset = document.getElementById('camReset');
    const camRotate = document.getElementById('camRotate');
    const camZoomIn = document.getElementById('camZoomIn');
    const camZoomOut = document.getElementById('camZoomOut');
    
    const animToggle = document.getElementById('animToggle');
    const animReplay = document.getElementById('animReplay');

    // Базовые настройки камеры для сброса
    const defaultOrbit = '35deg 75deg 105%';
    const defaultFov = '30deg';

    // ==========================================
    // Логика переключения вкладок (Моделей)
    // ==========================================
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Снимаем активность со всех вкладок
            tabs.forEach(t => {
                t.classList.remove('is-active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Активируем текущую
            tab.classList.add('is-active');
            tab.setAttribute('aria-selected', 'true');

            const target = tab.dataset.tab;
            
            if (target === 'trophy1') {
                viewer.src = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
                modelName.textContent = 'Кубок I · классическая чаша';
                animControls.classList.add('is-hidden');
            } else if (target === 'trophy2') {
                viewer.src = 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb';
                modelName.textContent = 'Кубок II · анимированная модель';
                animControls.classList.remove('is-hidden');
            }
            
            // Сбрасываем камеру при смене модели
            viewer.cameraOrbit = defaultOrbit;
            viewer.fieldOfView = defaultFov;
        });
    });

    // ==========================================
    // Управление камерой
    // ==========================================
    
    // Сброс вида
    camReset.addEventListener('click', () => {
        viewer.cameraOrbit = defaultOrbit;
        viewer.fieldOfView = defaultFov;
    });

    // Авто-вращение
    camRotate.addEventListener('click', (e) => {
        const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
        e.currentTarget.setAttribute('aria-pressed', !isPressed);
        viewer.autoRotate = !isPressed;
    });

    // Приближение (Zoom In)
    camZoomIn.addEventListener('click', () => {
        let fov = parseFloat(viewer.fieldOfView) || 30;
        fov = Math.max(20, fov - 5); 
        viewer.fieldOfView = `${fov}deg`;
    });

    // Отдаление (Zoom Out)
    camZoomOut.addEventListener('click', () => {
        let fov = parseFloat(viewer.fieldOfView) || 30;
        fov = Math.min(45, fov + 5); 
        viewer.fieldOfView = `${fov}deg`;
    });

    // ==========================================
    // Управление анимацией
    // ==========================================
    
    // Пауза / Воспроизведение
    animToggle.addEventListener('click', (e) => {
        const isPressed = e.currentTarget.getAttribute('aria-pressed') === 'true';
        e.currentTarget.setAttribute('aria-pressed', !isPressed);
        
        if (isPressed) {
            viewer.pause();
        } else {
            viewer.play();
        }
    });

    // Перезапуск анимации
    animReplay.addEventListener('click', () => {
        viewer.currentTime = 0;
        viewer.play();
    });

    // ==========================================
    // Обработка ошибок загрузки модели
    // ==========================================
    viewer.addEventListener('error', () => {
        document.getElementById('modelFallback').classList.remove('is-hidden');
        document.getElementById('modelStatusText').textContent = 'Ошибка загрузки';
    });
    
    viewer.addEventListener('load', () => {
        document.getElementById('modelFallback').classList.add('is-hidden');
        document.getElementById('modelStatusText').textContent = 'Модель готова';
    });
});