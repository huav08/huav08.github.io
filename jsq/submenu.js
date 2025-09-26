
    // 導覽列漢堡選單功能
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // 行動裝置子選單切換功能
    const hasSubmenus = document.querySelectorAll('.has-submenu > a');
    
    hasSubmenus.forEach(link => {
        link.addEventListener('click', (e) => {
            // 在行動裝置寬度時才啟用此功能
            if (window.innerWidth <= 768) {
                e.preventDefault(); // 阻止超連結跳轉
                const parentLi = link.parentElement;
                const submenu = parentLi.querySelector('.submenu');
                
                if (submenu) {
                    submenu.classList.toggle('active');
                }
            }
        });
    });