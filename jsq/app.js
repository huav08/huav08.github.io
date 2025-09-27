// 匯入 Firebase SDK 的核心功能和所需服務 (假設已匯入)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// 從 firebase/auth 匯入 sendPasswordResetEmail 函數
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js"; // [1, 2]
import { getFirestore, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// Firebase 初始化 (假設已完成)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBiueCPvAt53TFlP__pxGq1qYoeNsazGWI",
    authDomain: "transportmanagement-fab97.firebaseapp.com",
    projectId: "transportmanagement-fab97",
    storageBucket: "transportmanagement-fab97.firebasestorage.app",
    messagingSenderId: "446566817159",
    appId: "1:446566817159:web:3f4ccfb17fde00bafdc722",
    measurementId: "G-1EMS7KJD6M"
};

// 初始化 Firebase App
const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized");

// 初始化 Firebase 服務
const auth = getAuth(app);
const db = getFirestore(app);
console.log("Firebase Auth and Firestore Initialized");
//
// (此程式碼應放在 app.js 的頂層範圍，緊隨 Firebase 初始化之後)
onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed. User:", user? user.uid : 'null');
    if (user) {
        // 使用者已登入
        console.log("User is signed in. Email:", user.email);
        userDetailsElement.textContent = `已登入：${user.email}`; // 顯示使用者資訊

        // 更新 UI：顯示使用者資訊區塊，隱藏表單區塊
        loginSection.style.display = 'none';
        registerSection.style.display = 'none';
        userInfoSection.style.display = 'block';

        // **執行跳轉到登入後首頁 (例如 home.html)**
        // 使用 window.location.replace() 較好，它不會在瀏覽器歷史紀錄中留下登入頁面
        // 這樣使用者按下返回鍵時，不會回到登入頁。
        console.log("Redirecting to home page...");
        window.location.replace('home.html');

    } else {
        // 使用者已登出或未登入
        console.log("User is signed out.");
        userDetailsElement.textContent = ''; // 清除使用者資訊

        // 更新 UI：顯示登入表單區塊，隱藏註冊和使用者資訊區塊
        loginSection.style.display = 'block';
        registerSection.style.display = 'none'; // 預設顯示登入，註冊需點擊連結
        userInfoSection.style.display = 'none';
    }
});

console.log("onAuthStateChanged listener attached.");
//
// 選取 DOM 元素
const loginSection = document.getElementById('login-section');
const registerSection = document.getElementById('register-section');
const userInfoSection = document.getElementById('user-info-section');

const registerForm = document.getElementById('register-form');
const registerUsernameInput = document.getElementById('register-username');
const registerEmailInput = document.getElementById('register-email');
const registerPasswordInput = document.getElementById('register-password');
const registerConfirmPasswordInput = document.getElementById('register-confirm-password');
const registerErrorElement = document.getElementById('register-error');

const loginForm = document.getElementById('login-form'); // (用於後續登入)
const loginEmailInput = document.getElementById('login-email'); // (用於後續登入)
const loginPasswordInput = document.getElementById('login-password'); // (用於後續登入)
const loginErrorElement = document.getElementById('login-error'); // (用於後續登入)
const resetMessageElement = document.getElementById('reset-message'); // 選取密碼重設訊息元素
const forgotPasswordLink = document.getElementById('forgot-password-link'); // 選取忘記密碼連結

const userDetailsElement = document.getElementById('user-details'); // (用於後續顯示)
const logoutButton = document.getElementById('logout-button'); // (用於後續登出)

const showRegisterLink = document.getElementById('show-register');
const showLoginLink = document.getElementById('show-login');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 防止表單的預設提交行為
    registerErrorElement.textContent = ''; // 清除之前的錯誤訊息

    const username = registerUsernameInput.value.trim();
    const email = registerEmailInput.value.trim();
    const password = registerPasswordInput.value;
    const confirmPassword = registerConfirmPasswordInput.value;

    // 基本客戶端驗證
    if (!username ||!email ||!password ||!confirmPassword) {
        registerErrorElement.textContent = '所有欄位皆為必填。';
        return;
    }
    if (password!== confirmPassword) {
        registerErrorElement.textContent = '兩次輸入的密碼不符。';
        return;
    }
    if (password.length < 6) {
        registerErrorElement.textContent = '密碼長度至少需要 6 個字元。'; // Firebase 預設要求
        return;
    }

    // --- 呼叫 Firebase 註冊功能 ---
    try {
        console.log("Attempting to create user...");
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log("User created successfully in Auth:", user.uid);

        // --- 在 Firestore 中儲存額外使用者資料 ---
        console.log("Attempting to save user data to Firestore...");
        const userDocRef = doc(db, "users", user.uid); // 使用 Auth UID 作為 Firestore 文件 ID
        await setDoc(userDocRef, {
            uid: user.uid,
            username: username,
            email: user.email, // 儲存 email (可選，Auth 中已有)
            createdAt: serverTimestamp() // 記錄建立時間
        });
        console.log("User data saved successfully to Firestore for UID:", user.uid);

        // 註冊成功後的處理 (例如：清空表單，顯示成功訊息，或依賴 onAuthStateChanged 自動切換介面)
        registerForm.reset();
        // alert('註冊成功！您現在已登入。'); // 可以顯示提示，但 UI 切換最好由 onAuthStateChanged 處理

    } catch (error) {
        console.error("Registration Error:", error);
        handleAuthError(error, registerErrorElement); // 處理 Firebase 錯誤
    }
});
//
// (此程式碼應放在 app.js 中，例如在 DOM 元素選取之後)

logoutButton.addEventListener('click', async () => {
    try {
        console.log("Attempting to sign out...");
        await signOut(auth);
        console.log("User signed out successfully.");
        // 登出成功後的處理 (UI 更新由 onAuthStateChanged 自動處理)
        // alert('您已成功登出。'); // 可以顯示提示

    } catch (error) {
        console.error("Sign Out Error:", error);
        alert(`登出時發生錯誤：${error.message}`); // 顯示錯誤訊息
    }
});


// --- 忘記密碼連結點擊處理 ---
forgotPasswordLink.addEventListener('click', async (e) => {
    e.preventDefault(); // 防止連結的預設跳轉行為
    loginErrorElement.textContent = ''; // 清除登入錯誤
    resetMessageElement.textContent = ''; // 清除之前的重設訊息
    resetMessageElement.style.color = 'green'; // 重設為成功訊息顏色

    const email = loginEmailInput.value.trim();

    if (!email) {
        resetMessageElement.textContent = '請在上方欄位輸入您的電子郵件地址。';
        resetMessageElement.style.color = 'red';
        loginEmailInput.focus(); // 將焦點移至電子郵件輸入框
        return;
    }

    try {
        console.log(`Attempting to send password reset email to ${email}...`);
        await sendPasswordResetEmail(auth, email); // [1, 2]
        console.log("Password reset email sent successfully.");
        resetMessageElement.textContent = '密碼重設郵件已發送！請檢查您的收件匣。';

    } catch (error) {
        console.error("Password Reset Error:", error);
        // 使用 handleAuthError 處理錯誤，並顯示在 resetMessageElement
        handleAuthError(error, resetMessageElement);
    }
});

// --- 處理登入/註冊表單切換的連結 ---
showRegisterLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginSection.style.display = 'none';
    registerSection.style.display = 'block';
});

showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registerSection.style.display = 'none';
    loginSection.style.display = 'block';
});
// 輔助函數：處理 Firebase Auth 錯誤並顯示訊息
function handleAuthError(error, errorElement) {
    console.error("Auth Error Code:", error.code);
    console.error("Auth Error Message:", error.message);
    let message = '發生未知錯誤，請稍後再試。'; // 預設錯誤訊息
    switch (error.code) {
        case 'auth/email-already-in-use':
            message = '此電子郵件地址已被註冊。';
            break;
        case 'auth/invalid-email':
            message = '電子郵件地址格式不正確。';
            break;
        case 'auth/weak-password':
            message = '密碼強度不足，請至少使用 6 個字元。';
            break;
        case 'auth/operation-not-allowed':
            message = '電子郵件/密碼登入方式未啟用。'; // 檢查 Firebase 控制台設定
            break;
        // 可以根據需要添加更多錯誤碼處理
        // 參考: https://firebase.google.com/docs/reference/js/auth#autherrorcodes
        default:
            message = `註冊失敗：${error.message}`; // 顯示原始錯誤訊息（開發時有用）
    }
    errorElement.textContent = message;
}

// 在 registerForm 的 catch 區塊中呼叫:
// } catch (error) {
//     console.error("Registration Error:", error);
//     handleAuthError(error, registerErrorElement);
// }
//
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // 防止表單的預設提交行為
    loginErrorElement.textContent = ''; // 清除之前的錯誤訊息

    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value;

    // 基本客戶端驗證
    if (!email ||!password) {
        loginErrorElement.textContent = '電子郵件和密碼皆為必填。';
        return;
    }

    // --- 呼叫 Firebase 登入功能 ---
    try {
        console.log("Attempting to sign in...");
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // 登入成功
        const user = userCredential.user;
        console.log("User signed in successfully:", user.uid);

        // 登入成功後的處理 (例如：清空表單，但 UI 切換主要由 onAuthStateChanged 處理)
        loginForm.reset();
        // alert('登入成功！'); // 可以顯示提示

    } catch (error) {
        console.error("Login Error:", error);
        handleAuthError(error, loginErrorElement); // 使用相同的錯誤處理函數
    }
});