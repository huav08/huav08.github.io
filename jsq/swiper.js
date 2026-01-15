const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    speed: 500,
    autoplay: {
        delay: 10000,
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
                    title.style.animation = 'slideUp 0.5s ease forwards';
                    description.style.animation = 'slideUp 0.5s ease 0.2s forwards';
                }, 50);
            }
        }
    }
});