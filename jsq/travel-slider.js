document.addEventListener('DOMContentLoaded', function() {
    const sliderSection = document.getElementById('home');
    if (!sliderSection) return;

    // Data for the slider
    const slides = [
        { 
            id: "", 
            title: "SimEnvi", 
            subtitle: "Innovation", 
            main: "技術權威與精準治理",
            subtitle: "Innovation", 
            desc: "以精準數據驅動環境治理，從污染模擬到氣候風險，為永續決策提供堅實依據。", 
            image: "https://images.unsplash.com/photo-1470004914212-05527e49370b?q=80&w=2070&auto=format&fit=crop" 
        },
        { 
            id: "", 
            title: "SimEnvi", 
            subtitle: "Innovation", 
            main: "全方位整合與一站式服務", 
            desc: "跨越合規與轉型，您的全方位環境智庫 —— 從環評監測、生態檢核到淨零路徑規劃。", 
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop" 
        },
        { 
            id: "", 
            title: "SimEnvi",
            subtitle: "Innovation",  
            main: "守護與前瞻", 
            desc: "深耕環境監測與生態檢核，佈局淨零碳排與氣候韌性，守護環境健康的專業推手。", 
            image: "https://images.unsplash.com/photo-1596562095861-2dc048e9f546?q=80&w=2070&auto=format&fit=crop" 
        }
    ];

    let currentIndex = 0;
    let autoPlayTimer;

    const bgImg = document.getElementById('bg-img');
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');
    const infoTitle = document.getElementById('info-title');
    const infoDesc = document.getElementById('info-desc');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!bgImg || !mainTitle || !subTitle || !infoTitle || !infoDesc || !prevBtn || !nextBtn) {
        console.warn("Travel Slider: One or more elements not found inside #home.");
        return;
    }

    function updateSlide(index) {
        const slide = slides[index];
        bgImg.style.opacity = '0';
        
        [mainTitle, subTitle, infoTitle, infoDesc].forEach(el => el.classList.remove('animate-text'));

        setTimeout(() => {
            bgImg.src = slide.image;
            // Handle image load to ensure smooth transition
            bgImg.onload = () => bgImg.style.opacity = '1';
            // Fallback if cached or instant load
            if(bgImg.complete) bgImg.style.opacity = '1';

            mainTitle.innerText = slide.title;
            mainTitle.setAttribute('data-text', slide.title);
            subTitle.innerText = slide.subtitle;
            infoTitle.innerText = `${slide.id} ${slide.main}`;
            infoDesc.innerText = slide.desc;

            [mainTitle, subTitle, infoTitle, infoDesc].forEach(el => el.classList.add('animate-text'));
        }, 300);

        startAutoPlay(); // Reset timer on interaction
    }

    // Auto Play: 30 seconds
    function startAutoPlay() {
        if (autoPlayTimer) clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide(currentIndex);
        }, 30000); 
    }

    // Scroll Switch Logic
    let isScrolling = false;
    sliderSection.addEventListener('wheel', (e) => {
        // Only intercept scroll if the user is interacting with the slider heavily, 
        // but typically for a full-screen slider, preventing default is standard 
        // to avoid scrolling past it while trying to change slides.
        // However, if the slider is not full viewport height, this might be annoying.
        // Given the request "like flipping a page", we prevent default.
        e.preventDefault(); 
        
        if (isScrolling) return;

        isScrolling = true;
        
        if (e.deltaY > 0) {
            currentIndex = (currentIndex + 1) % slides.length;
        } else {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }
        updateSlide(currentIndex);

        // Lock for 1 second to avoid rapid firing
        setTimeout(() => { isScrolling = false; }, 1000);
    }, { passive: false });

    // Button Events
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlide(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(currentIndex);
    });

    // Initialize
    updateSlide(0);
});
