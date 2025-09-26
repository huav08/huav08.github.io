

    // 搜尋功能
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    function performInternalSearch() {
        const query = searchInput.value;
        if (query) {
            // 這個函式會導向到一個特別的 URL，讓 Google 顯示站內搜尋結果
            // 將 moenv.gov.tw 替換為您的網站域名
            window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}+site:https://www.simenvi.com.tw`;
        }
    }

    // 點擊按鈕時執行搜尋
    searchButton.addEventListener('click', performInternalSearch);

    // 按下 Enter 鍵時執行搜尋
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performInternalSearch();
        }
    });