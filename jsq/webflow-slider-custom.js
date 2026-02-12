document.addEventListener('DOMContentLoaded', function() {
    const slider = document.getElementById('featuredSlider');
    if (!slider) return;

    const mask = slider.querySelector('.w-slider-mask');
    const slides = slider.querySelectorAll('.w-slide');
    const prevBtn = document.getElementById('slidePrev');
    const nextBtn = document.getElementById('slideNext');
    const nav = document.getElementById('slideNav');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer;

    // Create Navigation Dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('w-slider-dot');
        if (i === 0) dot.classList.add('w-active');
        dot.addEventListener('click', () => goToSlide(i));
        nav.appendChild(dot);
    }

    const dots = nav.querySelectorAll('.w-slider-dot');

    function updateSlider() {
        // Simple translation for now, can be enhanced to "over" effect with more CSS
        mask.style.transition = 'transform 0.5s ease-out-quint'; // mimicking easing
        mask.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update dots
        dots.forEach((dot, i) => {
            if (i === currentIndex) dot.classList.add('w-active');
            else dot.classList.remove('w-active');
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
        resetTimer();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Initial setup
    updateSlider();
    startAutoPlay();

    // Mouse events to pause autoPlay
    slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    slider.addEventListener('mouseleave', resetTimer);
});
