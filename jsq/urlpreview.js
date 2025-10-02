document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.preview-link');

    links.forEach(link => {
        // 取得預覽小視窗元素
        const previewBox = link.querySelector('.preview-box');

        // 取得 data 屬性中的內容
        const title = link.getAttribute('data-title') || '無標題';
        const description = link.getAttribute('data-description') || '無描述資訊。';
        const image = link.getAttribute('data-image'); // 縮圖是可選的

        // 建立預覽小視窗的 HTML 內容
        let previewContent = '';
        if (image) {
            previewContent += `<img src="${image}" alt="${title} 縮圖">`;
        }
        previewContent += `<h4>${title}</h4>`;
        previewContent += `<p>${description}</p>`;

        // 填充內容
        previewBox.innerHTML = previewContent;
        
        // 額外：處理手機等觸摸設備 (沒有 hover) 的點擊/長按顯示邏輯
        // 由於手機上預覽體驗不好，通常會禁用或改用點擊開關。
        // 這裡僅提供懸停邏輯，若要實現更好的移動端體驗，需要更複雜的事件處理。
    });
});