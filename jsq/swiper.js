const swiper = new Swiper('.swiper', {
    effect: 'fade',
    fadeEffect: {
        crossFade: true
    },
    speed: 7000,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
    on: {
        slideChange: function () {
            // 重新觸發文字動畫
            const activeSlide = this.slides[this.activeIndex];
            const title = activeSlide.querySelector('.slide-title');
            const description = activeSlide.querySelector('.slide-description');
            
            if (title && description) {
                title.style.animation = 'none';
                description.style.animation = 'none';
                
                setTimeout(() => {
                    title.style.animation = 'slideUp 7s ease forwards';
                    description.style.animation = 'slideUp 7s ease 0.2s forwards';
                }, 50);
            }
        }
    }
});