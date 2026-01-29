// 頁籤切換功能
function openTab(evt, tabName) {
  let i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// RSS 來源設定
const rssFeeds = [
    {
        // 由於瀏覽器安全性限制 (CORS)，我們需要透過代理伺服器來取得 RSS 內容
        // 改用 api.allorigins.win 以避免 403 錯誤
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://service.ema.gov.tw/Rss/RssChannel/zh-tw/215'),
        listId: 'newsReleaseList',
        useMinguo: true // 使用民國年
    },
    {
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.epa.ie/resources/rss/index-90474.xml'),
        listId: 'clarificationList',
        useMinguo: false // 使用西元年
    } /* ,
    {
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://www.simenvi.com.tw/rss/simenvinews.xml'),
        listId: 'newsSimenviList',
        useMinguo: true // 使用民國年
    } */
];

/**
 * 取得並顯示 RSS 內容
 * @param {object} feed - 包含 url、listId 和 useMinguo 的物件
 */
    const fetchAndDisplayRss = async (feed) => {
    const listElement = document.getElementById(feed.listId);
    try {
        const response = await fetch(feed.url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, 'text/xml');
        
        const items = xml.querySelectorAll('item');
        if (items.length === 0) {
            listElement.innerHTML = '<li>目前沒有新聞內容。</li>';
            return;
        }

        // 將 NodeList 轉為陣列並排序
        const sortedItems = Array.from(items).sort((a, b) => {
            let pubDateAEl = a.querySelector('pubDate') || a.querySelector('updated');
            let pubDateBEl = b.querySelector('pubDate') || b.querySelector('updated');

            // 防禦性檢查，處理 item 中缺少 pubDate 標籤的情況
            if (!pubDateAEl && !pubDateBEl) return 0; // 兩者都缺，視為相等
            if (!pubDateAEl) return 1;  // a 缺少日期，排到後面
            if (!pubDateBEl) return -1; // b 缺少日期，排到後面

            try {
                const dateA = new Date(pubDateAEl.textContent);
                const dateB = new Date(pubDateBEl.textContent);
                // 處理無效日期
                if (isNaN(dateA.getTime())) return 1;
                if (isNaN(dateB.getTime())) return -1;
                return dateB - dateA; // 由新到舊排序
            } catch (e) {
                return 0; // 如果日期解析出錯，視為相等
            }
        });

        let html = '';
        sortedItems.forEach(item => {
            const titleEl = item.querySelector('title');
            const linkEl = item.querySelector('link');
            let pubDateEl = item.querySelector('pubDate');
            if(pubDateEl == null) pubDateEl = item.querySelector('updated');

            // 如果缺少標題或連結，則跳過此項目
            if (!titleEl || !linkEl) {
                return;
            }

            const title = titleEl.textContent;
            const link = linkEl.textContent;
            let formattedDate = '無日期'; // 日期預設文字

            if (pubDateEl && pubDateEl.textContent) {
                const pubDate = new Date(pubDateEl.textContent);
                if (!isNaN(pubDate.getTime())) { // 檢查日期是否有效
                    // 根據 feed 設定決定使用民國年或西元年
                    const year = feed.useMinguo ? pubDate.getFullYear() - 1911 : pubDate.getFullYear();
                    const month = String(pubDate.getMonth() + 1).padStart(2, '0');
                    const day = String(pubDate.getDate()).padStart(2, '0');
                    formattedDate = `${year}-${month}-${day}`;
                }
            }

            html += `<li><span class="date-badge">${formattedDate}</span> <span class="indexNewsList"><a href="${link}" target="_blank" title="${title}(另開新視窗)">${title}</a></span></li>`;
        });
        
        listElement.innerHTML = html;
    } catch (error) {
        console.error('抓取 RSS 來源時發生錯誤:', error);
        listElement.innerHTML = '<li>無法載入新聞內容，請稍後再試。</li>';
    }
};

// 網頁載入後執行
document.addEventListener('DOMContentLoaded', () => {
    // 預設開啟第一個頁籤
    document.getElementById("defaultOpen").click();
    
    // 取得所有 RSS 來源
    rssFeeds.forEach(fetchAndDisplayRss);
});