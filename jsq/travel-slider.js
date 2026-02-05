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
            image: "./images/photo-1470004914212-05527e49370b.png" 
        },
        { 
            id: "", 
            title: "SimEnvi", 
            subtitle: "Innovation", 
            main: "全方位整合與一站式服務", 
            desc: "跨越合規與轉型，您的全方位環境智庫　－－　從環評監測、生態檢核到淨零路徑規劃。", 
            image: "./images/photo-1473341304170-971dccb5ac1e.png" 
        },
        { 
            id: "", 
            title: "SimEnvi",
            subtitle: "Innovation",  
            main: "守護與前瞻", 
            desc: "深耕環境監測與生態檢核，佈局淨零碳排與氣候韌性，守護環境健康的專業推手。", 
            image: "./images/home-bg.jpg" 
        }
    ];

    let currentIndex = 0;
    let autoPlayTimer;
    let typewriterInterval;

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

    function typeWriter(text, element, speed = 30) {
        element.innerText = "";
        let i = 0;
        clearInterval(typewriterInterval);
        typewriterInterval = setInterval(() => {
            if (i < text.length) {
                element.innerText += text.charAt(i);
                i++;
            } else {
                clearInterval(typewriterInterval);
            }
        }, speed);
    }

    function updateSlide(index) {
        const slide = slides[index];
        bgImg.style.opacity = '0';
        
        // Stop any active typing
        clearInterval(typewriterInterval);
        infoDesc.innerText = ""; 

        [mainTitle, subTitle, infoTitle, infoDesc].forEach(el => {
            el.classList.remove('animate-text');
            el.style.opacity = '0';
        });

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
            // infoDesc text is set via typeWriter below

            // Animate other elements with fade-in
            [mainTitle, subTitle, infoTitle].forEach(el => el.classList.add('animate-text'));
            
            // Handle infoDesc separately for typewriter effect
            infoDesc.style.opacity = '1'; // Ensure it's visible for typing
            typeWriter(slide.desc, infoDesc);

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
        if (isScrolling) return;

        // If scrolling down at the last slide, let the page scroll
        if (e.deltaY > 0 && currentIndex === slides.length - 1) {
            return; 
        }

        // If scrolling up at the first slide, let the page scroll
        if (e.deltaY < 0 && currentIndex === 0) {
            return;
        }

        // Otherwise, intercept scroll to change slides
        e.preventDefault(); 
        isScrolling = true;
        
        if (e.deltaY > 0) {
            currentIndex++;
        } else {
            currentIndex--;
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
