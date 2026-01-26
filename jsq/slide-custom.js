document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');
    const slide = document.getElementById('slide');

    if (nextBtn && prevBtn && slide) {
        const nextSlide = function() {
            let lists = document.querySelectorAll('.item');
            if (lists.length > 0) {
                slide.appendChild(lists[0]);
            }
        };

        const prevSlide = function() {
            let lists = document.querySelectorAll('.item');
            if (lists.length > 0) {
                slide.prepend(lists[lists.length - 1]);
            }
        };

        nextBtn.onclick = function() {
            nextSlide();
            resetTimer();
        };

        prevBtn.onclick = function() {
            prevSlide();
            resetTimer();
        };

        // 自動播放邏輯 (5秒)
        let autoPlayTimer = setInterval(nextSlide, 5000);

        function resetTimer() {
            clearInterval(autoPlayTimer);
            autoPlayTimer = setInterval(nextSlide, 5000);
        }

        // 滑鼠移入停止播放，移出恢復 (可選優化)
        const container = document.querySelector('.slide-container');
        if (container) {
            container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
            container.addEventListener('mouseleave', () => {
                clearInterval(autoPlayTimer);
                autoPlayTimer = setInterval(nextSlide, 5000);
            });
        }
    }
});