document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('track');
    if (!track) return;

    const cards = Array.from(track.querySelectorAll('.carousel-card'));
    const pagination = document.getElementById('pagination');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0; 
    let autoPlayTimer;
    const autoPlayDelay = 10000;

    function init() {
        // 建立指示點
        if (pagination) {
            pagination.innerHTML = ''; // Clear existing
            cards.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                dot.onclick = () => { goToIndex(index); resetTimer(); };
                pagination.appendChild(dot);
            });
        }

        // 卡片點擊事件
        cards.forEach((card, index) => {
            card.onclick = () => { 
                if (currentIndex !== index) {
                    goToIndex(index); 
                    resetTimer(); 
                }
            };
        });

        // 按鈕事件
        if (nextBtn) nextBtn.onclick = () => { nextSlide(); resetTimer(); };
        if (prevBtn) prevBtn.onclick = () => { prevSlide(); resetTimer(); };

        updateCarousel();
        startTimer();
    }

    function updateCarousel() {
        cards.forEach((card, index) => {
            card.className = 'carousel-card'; // Reset classes
            
            // Calculate distance considering circular wrap
            let diff = index - currentIndex;
            
            // Adjust diff for circular wrapping to find shortest path logic
            // But for the stack effect, we strictly use the array order relative to current
            // However, the original slide2 code logic:
            // if (diff === 0) ... else if (diff === -1) ...
            // This logic doesn't handle wrapping visually well for elements far away in the array but "next" in loop
            // The logic below assumes a simple linear distance or circular? 
            // The original logic was:
            // cards.forEach((card, index) => {
            //    const diff = index - currentIndex;
            //    ...
            // })
            // This is NOT circular. It just hides the ones far away.
            // But nextSlide() does: currentIndex = (currentIndex + 1) % cards.length;
            
            // Let's improve the logic to be truly circular visually if possible, 
            // OR stick to the simple logic which shows neighbors.
            // If the list is looped, we want the last item to appear to the left of the first item when first is active.
            
            // To handle circular visual states correctly:
            const total = cards.length;
            
            // Calculate circular distance
            let dist = (index - currentIndex + total) % total;
            if (dist > total / 2) dist -= total;
            
            // dist is now e.g. 0 (center), 1 (right), -1 (left), 2 (right), -2 (left)
            
            if (dist === 0) card.classList.add('center');
            else if (dist === -1) card.classList.add('left-1');
            else if (dist === 1) card.classList.add('right-1');
            else if (dist === -2) card.classList.add('left-2');
            else if (dist === 2) card.classList.add('right-2');
            else {
                // Determine direction to hide
                // card.classList.add('hidden'); // Original just hid them
                // We can just leave them with base class which has opacity 0
            }
            
            // Handle z-index and opacity for non-visible items if needed
        });

        if (pagination) {
            const dots = pagination.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }

    function goToIndex(index) {
        currentIndex = index;
        updateCarousel();
    }

    // 自動輪播邏輯
    function startTimer() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextSlide, autoPlayDelay);
    }

    function resetTimer() {
        clearInterval(autoPlayTimer);
        startTimer();
    }

    init();
});
