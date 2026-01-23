
    // 導覽列漢堡選單功能
    const hamburger = document.getElementById('hamburger');
    const mainNav = document.querySelector('.main-nav');
    const searchBar = document.querySelector('.search-bar');
    const fonthBar = document.querySelector('.font-btn');
    const fonthdBar = document.querySelector('#font-decrease');
    const fonthiBar = document.querySelector('#font-increase');
    
    hamburger.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        
        // 在 mobile 設備上切換 search-bar 的顯示/隱藏
        if (window.innerWidth <= 768) {
            if (mainNav.classList.contains('active')) {
                searchBar.style.display = 'none';
                fonthBar.style.display = 'none';
                fonthdBar.style.display = 'none';
                fonthiBar.style.display = 'none';
            } else {
                searchBar.style.display = 'flex';
                fonthBar.style.display = 'flex';
                fonthdBar.style.display = 'flex';
                fonthiBar.style.display = 'flex';
            }
        }
    });

    // 行動裝置子選單切換功能
    const hasSubmenus = document.querySelectorAll('.has-submenu > a');
    
    hasSubmenus.forEach(link => {
        link.addEventListener('click', (e) => {
            // 在行動裝置寬度時才啟用此功能
            if (window.innerWidth <= 768) {
                const parentLi = link.parentElement;
                const submenu = parentLi.querySelector('.submenu');
                
                // 只有真正有子選單的項目才阻止預設行為
                if (submenu) {
                    e.preventDefault(); // 阻止超連結跳轉
                    submenu.classList.toggle('active');
                    parentLi.classList.toggle('active');
                }
                // 沒有子選單的項目（如人才招募、聯絡我們）讓其正常跳轉
            }
        });
    });