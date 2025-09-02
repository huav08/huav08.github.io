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
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://service.ema.gov.tw/Rss/RssChannel/zh-tw/215'),
        listId: 'newsReleaseList'
    },
    {
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://service.ema.gov.tw/Rss/RssChannel/zh-tw/217'),
        listId: 'clarificationList'
    }
];

/**
 * 取得並顯示 RSS 內容
 * @param {object} feed - 包含 url 和 listId 的物件
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
            const dateA = new Date(a.querySelector('pubDate').textContent);
            const dateB = new Date(b.querySelector('pubDate').textContent);
            return dateB - dateA; // 由新到舊排序
        });

        let html = '';
        sortedItems.forEach(item => {
            const title = item.querySelector('title').textContent;
            const link = item.querySelector('link').textContent;
            const pubDate = new Date(item.querySelector('pubDate').textContent);

            // 格式化日期為 YYYY-mm-dd
            const currentYear = new Date().getFullYear() - 1911;
            const year = pubDate.getFullYear() - 1911;
            const month = String(pubDate.getMonth() + 1).padStart(2, '0');
            const day = String(pubDate.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            if(year == currentYear) {
                html += `<li><span class="date-badge">${formattedDate}</span> <span class="indexNewsList"><a href="${link}" target="_blank" title="${title}(另開新視窗)">${title}</a></span></li>`;
            }
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