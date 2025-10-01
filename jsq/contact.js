let submitted = false; // 追蹤表單是否已提交

/**
 * 執行 JavaScript 格式檢查和必填驗證。
 */
function validateForm() {
    const form = document.getElementById('contactForm');
    
    // 讓瀏覽器執行 HTML5 內建的必填和 type 檢查 (例如 type="email")
    if (!form.checkValidity()) {
        // 如果瀏覽器檢查失敗，通常會自動顯示錯誤訊息
        return false; 
    }

    // 1. Phone 格式檢查
    const phoneInput = document.getElementById('phone');
    const phonePattern = /^\+?[\d\s\-\(\)]{7,15}$/; // 允許數字、空格、破折號、括號，長度 7-15
    const phoneError = document.getElementById('phone-error');
    
    if (!phonePattern.test(phoneInput.value)) {
        phoneError.style.display = 'block';
        phoneInput.focus();
        return false;
    } else {
        phoneError.style.display = 'none';
    }

    // 2. E-mail 格式檢查 (額外的 JS 檢查，雖然 input type="email" 已提供基礎檢查)
    const emailInput = document.getElementById('email');
    // 基礎 E-mail 格式正則表達式
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 
    const emailError = document.getElementById('email-error');

    if (!emailPattern.test(emailInput.value)) {
        emailError.style.display = 'block';
        emailInput.focus();
        return false;
    } else {
        emailError.style.display = 'none';
    }
    
    // 如果所有檢查都通過
    submitted = true;
    document.getElementById('form-status').innerHTML = '正在送出...';
    return true; // 允許表單提交到 Google Form
}

/**
 * 表單提交完成後由 iframe 呼叫。
 */
function formSubmitted() {
    if (submitted) {
        document.getElementById('form-status').innerHTML = '✅ 表單已成功送出！感謝您的填寫。';
        document.getElementById('contactForm').reset(); // 清空表單欄位
        submitted = false; // 重設標記
    }
}

// 隱藏錯誤訊息的事件監聽器
document.getElementById('phone').addEventListener('input', function() {
    document.getElementById('phone-error').style.display = 'none';
});
document.getElementById('email').addEventListener('input', function() {
    document.getElementById('email-error').style.display = 'none';
});

// 綁定 iframe 的 onload 事件，確保在提交後觸發 formSubmitted 函數
document.getElementById('contactForm').target = 'hidden_iframe';
document.getElementById('hidden_iframe').onload = function() {
    if(submitted) {
        formSubmitted();
    }
};