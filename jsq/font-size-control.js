// 文字大小控制功能
let currentFontSize = 100;

document.addEventListener('DOMContentLoaded', function() {
    const increaseBtn = document.getElementById('font-increase');
    const decreaseBtn = document.getElementById('font-decrease');
    
    if (increaseBtn) {
        increaseBtn.addEventListener('click', function() {
            if (currentFontSize < 150) {
                currentFontSize += 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        });
    }
    
    if (decreaseBtn) {
        decreaseBtn.addEventListener('click', function() {
            if (currentFontSize > 80) {
                currentFontSize -= 10;
                document.body.style.fontSize = currentFontSize + '%';
            }
        });
    }
});