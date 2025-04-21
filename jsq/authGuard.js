import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// 從 firebase/auth 匯入 signOut 函數
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// TODO: 將此處替換為您在 Firebase 控制台中取得的設定物件
// 確保這裡的設定與 app.js 中的設定完全相同
const firebaseConfig = {
  apiKey: "AIzaSyBiueCPvAt53TFlP__pxGq1qYoeNsazGWI",
  authDomain: "transportmanagement-fab97.firebaseapp.com",
  projectId: "transportmanagement-fab97",
  storageBucket: "transportmanagement-fab97.firebasestorage.app",
  messagingSenderId: "446566817159",
  appId: "1:446566817159:web:3f4ccfb17fde00bafdc722",
  measurementId: "G-1EMS7KJD6M" // 可選
};

// 初始化 Firebase App
const app = initializeApp(firebaseConfig);
console.log("Firebase App Initialized (authGuard)");

// 初始化 Firebase Auth 服務
const auth = getAuth(app);
console.log("Firebase Auth Initialized (authGuard)");

console.log("Setting up onAuthStateChanged listener (authGuard)...");

onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed (authGuard). User:", user? user.uid : 'null');
    if (user) {
        // --- 使用者已登入 ---
        console.log("User is authenticated. Allowing access to this page.");
        // 使用者已登入，允許留在當前頁面 (home.html)
        // 你可以在這裡執行其他需要登入後才能進行的操作，
        // 例如顯示使用者名稱、載入使用者特定資料等。
        // 假設 home.html 有一個 <span id="welcome-user"></span>
        const welcomeElement = document.getElementById('welcome-user');
        if (welcomeElement) {
            welcomeElement.textContent = `歡迎，${user.uid}！`;
        }

    } else {
        // --- 使用者已登出或未登入 ---
        console.log("User is not authenticated. Redirecting to login page...");
        // **執行跳轉回登入頁面 (例如 index.html)**
        window.location.replace('index.html'); // <-- 跳轉回你的登入頁面
    }
});

console.log("onAuthStateChanged listener attached (authGuard).");

// 如果 home.html 也有登出按鈕，可以在這裡加上事件監聽器
// import { signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
const logoutButtonHome = document.getElementById('logout-button-home'); // 假設 home.html 有此按鈕
// if (logoutButtonHome) {
//      logoutButtonHome.addEventListener('click', async () => {
//          try {
//              await signOut(auth);
//              console.log("User signed out from home page.");
//              // onAuthStateChanged 會自動處理跳轉回 index.html
//          } catch (error) {
//              console.error("Sign Out Error from home:", error);
//              alert(`登出時發生錯誤：${error.message}`);
//          }
//      });
// }

// --- 加入登出按鈕的事件監聽器 ---
if (logoutButtonHome) {
    logoutButtonHome.addEventListener('click', async () => {
        try {
            console.log("Attempting to sign out from home page...");
            await signOut(auth); // 呼叫 signOut 函數
            console.log("User signed out successfully from home page.");
            // 登出成功後，不需要手動跳轉頁面。
            // 上方的 onAuthStateChanged 監聽器會偵測到狀態改變 (user 變為 null)，
            // 並自動執行 
            window.location.replace('https://huav08.github.io/');
        } catch (error) {
            console.error("Sign Out Error from home:", error);
            // 可以在這裡向使用者顯示錯誤訊息
            alert(`登出時發生錯誤：${error.message}`);
        }
    });
    console.log("Logout button event listener attached.");
} else {
    console.warn("Logout button with ID 'logout-button-home' not found.");
}