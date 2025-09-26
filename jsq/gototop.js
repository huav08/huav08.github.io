

    // Go To Top 功能
    const goToTopBtn = document.getElementById('goToTop');

    // 監聽滾動事件，決定是否顯示按鈕
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            goToTopBtn.classList.add('show');
        } else {
            goToTopBtn.classList.remove('show');
        }
    });

    // 點擊按鈕回到頂部
    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });