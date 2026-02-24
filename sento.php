<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

	// 啟用 session，用於儲存 CAPTCHA 答案
	session_start();

	// 確保只有 POST 請求才能存取此腳本
	if ($_SERVER["REQUEST_METHOD"] == "POST")  {	
	  // 驗證 CAPTCHA
	  $user_captcha = strtolower(trim($_POST['checkcode1'] ?? ''));
	  $session_captcha = $_SESSION['captcha_code'] ?? '';
	  unset($_SESSION['captcha_code']); // 立即註銷驗證碼，避免重複使用

	  if (empty($session_captcha) || $user_captcha !== $session_captcha) {
		$success = "";
		$errors = "失敗";
		$message = "驗證碼錯誤或已失效，請重新輸入。";
		myResult($success, $errors, $message);
	  }

	  // 2. 驗證和清理所有使用者輸入
	  if (!empty($_POST['sendaction'])) {
		ini_set('display_errors', 'Off'); //Disabled Error Info	

		// 清理姓名：移除空白、HTML標籤，並轉換特殊字元為HTML實體
		// $name    = $_POST['userName'];
    	$name = htmlspecialchars(strip_tags(trim($_POST["userName"] ?? '')));
		if (!(preg_match('/^[\p{Han}\p{P}\p{Zs}]*$/u', $name))) { 
			$success = "";
			$errors = "失敗";
			$message = "姓名不能包含非中文字元！";
			myResult($success, $errors, $message);
		}

		$sex 	 = $_POST['sex'];
		
		// 清理userUnits：移除空白、HTML標籤，並轉換特殊字元為HTML實體
		// $place   = $_POST['userUnits'];
		$place = htmlspecialchars(strip_tags(trim($_POST["userUnits"] ?? '')));

		// 清理userPhone：移除空白、HTML標籤，並轉換特殊字元為HTML實體
		// $phone   = $_POST['userPhone'];
    	$phone = htmlspecialchars(strip_tags(trim($_POST["userPhone"] ?? '')));

		// 清理電子郵件：移除不合法的電子郵件字元，然後驗證格式
		// $email   = $_POST['userEmail'];
		$email = filter_var(trim($_POST["userEmail"] ?? ''), FILTER_SANITIZE_EMAIL);
		if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			// 如果電子郵件格式無效，則終止腳本並顯示錯誤訊息
			// echo '<div class="message error">無效的電子郵件格式。請返回並重試。</div>';
			// exit;
			$success = "";
			$errors = "失敗";
			$message = "無效的電子郵件格式。請返回並重試。";
			myResult($success, $errors, $message);
		}
		// 清理question：移除空白、HTML標籤，並轉換特殊字元為HTML實體
		// $body    = $_POST['question'];
		$body = htmlspecialchars(strip_tags(trim($_POST["question"] ?? '')));		

		// 清理sendaction：移除空白、HTML標籤，並轉換特殊字元為HTML實體
		// $action  = $_POST['sendaction'];
		$action = htmlspecialchars(strip_tags(trim($_POST["sendaction"] ?? '')));
		
		// 對於主旨，我們也確保沒有換行符。
		$body = str_replace(array("\n", "\r"), '', $body); // 移除主旨中的換行符
	
		// 4. 檢查必填欄位是否為空
		if (empty($name) || empty($place)  || empty($phone)  || empty($email) || empty($body) || empty($action)) {
			// echo '<div class="message error">請填寫所有必填欄位。</div>';
			//exit;
			$success = "";
			$errors = "失敗";
			$message = "請填寫所有必填欄位。";
			myResult($success, $errors, $message);
		}

		// echo "<script>alert('傳送信件中 ...')</script>";
		if($action) {
			//echo "start to send!";
			//include_once('class/class.phpmailer.php');// 匯入PHPMailer類別

			require 'vendor/phpmailer/phpmailer/src/Exception.php';
			require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
			require 'vendor/phpmailer/phpmailer/src/SMTP.php';

			//Load composer's autoloader
			require 'vendor/autoload.php'; 
			
			// ini_set('display_errors', 1);
			// ini_set('display_startup_errors', 1);
			// error_reporting(E_ALL); 
			$to   = "simenvi_it@simenvi.com.tw";
			$from   = "simenvi_it@simenvi.com.tw";
			// $from   = "simenvi_it@simenvi.com.tw";
			// List of recipients
			$recipients = array(
				"simenvi_it@simenvi.com.tw" => "客服",
				"jim@simenvi.com.tw" => "管理部",
				"chien@simenvi.com.tw" => "管理部",
				"h63882@simenvi.com.tw" => "管理部",
				"huav08@simenvi.com.tw" => "管理部",
			);
			//指定郵件主旨
			$subject = "官網聯絡我們 - 詢問";
			$message = "姓名:".$name."\n"
						."性別:".$sex."\n"
						."單位:".$place."\n"
						."電話:".$phone."\n"
						."信箱:".$email."\n"
						."內容:\n".$body;

			//若要傳送 HTML 格式的郵件，須指定 Content-type 標頭資訊
			// 4. 建構電子郵件標頭
			// 這是防止電子郵件標頭注入的關鍵部分。
			// 確保 From 和 Reply-To 標頭中沒有換行符。
			// filter_var(..., FILTER_VALIDATE_EMAIL) 已經有助於此，
			// 但額外的檢查（例如 str_replace）可以增加安全性，儘管對於電子郵件地址來說通常不是必需的，
			// 因為 filter_var 已經很嚴格了。
    		$headers .= "Reply-To: " . $email . "\r\n";
			$headers  = "MIME-Version: 1.0\r\n";
    		$headers .= "Content-Type: text/plain; charset=UTF-8\r\n"; // 確保使用 UTF-8 編碼
			$headers .= "To:".$to."\r\n";
			$headers .= "From:website<".$email.">\r\n";
			$headers = iconv("Big5","UTF-8", $headers);

			$mailer = new PHPMailer();// 建立新物件
			//傳送郵件
			$mailer->IsSMTP();// 設定使用SMTP方式寄信
			$mailer->SMTPAuth = true;// 設定SMTP需要驗證
			$mailer->SMTPSecure = "tls";// mail的SMTP主機需要使用TLS	
			$mailer->SMTPOptions = array(
				'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
				)
			);
			$mailer->Host = "mail.simenvi.com.tw";// mail的SMTP主機
			$mailer->Port = 587;// mail的SMTP主機的寄信port為587；mail的SMTP主機的寄信port為995
			$mailer->Username = "simenvi_it@simenvi.com.tw";// 設定驗證帳號
			$mailer->CharSet = "utf-8";// 設定郵件編碼
			$mailer->Subject = $subject;// 設定郵件標題
			$mailer->From = $from;// 設定寄件者信箱
			$mailer->FromName = "景丰官方網站信件";// 設定寄件者姓名或標題
			$mailer->Body = $message;				
			
			// Send a message to each recipient.
			// Headers that are unique for each message should be set within the foreach loop
			$numItems = count($recipients);
			$i = 0;
			if(trim($name) != '' && trim($phone) != '' && trim($email) != '' && trim($body) != '') {
				foreach ($recipients as $emailx => $namex) {
					// Generate headers that are unique for each message
					$mailer->ClearAllRecipients();

					// $mailer->AddAddress($to, "客服");// 收件者郵件及名稱	
					$mailer->AddAddress($emailx, $namex);
					
					if(!$mailer->Send()) {
						if(++$i === $numItems) {
							// echo "<script>alert('寄信失敗!')</script>";
                            $success = "";
                            $errors = "失敗";
                            $message = "寄信失敗! 錯誤原因: " . $mailer->ErrorInfo;
						}
					}
					else {			
						if(++$i === $numItems) {
							// echo "<script>alert('寄信成功!')</script>";
                            $success = "成功";
                            $errors = "";
                            $message = "寄信成功!";
						}
					}
				}
			}
			else {		
				// echo "<script>alert('欄位必須填寫資料!')</script>";
                $success = "";
                $errors = "失敗";
                $message = "欄位必須填寫資料!";
			}
		}
		myResult($success, $errors, $message);
	  }
	} else {
		// 如果不是 POST 請求，則顯示錯誤訊息
		// echo '<div class="message error">無效的請求方法。請通過表單提交。</div>';
		$success = "";
		$errors = "失敗";
		$message = "無效的請求方法。請通過表單提交。";
		myResult($success, $errors, $message);
	}

	function myResult($success, $errors, $message) {
		
		// $_POST=array(); // 清除 POST 歷史儲存資料
        $response = array();
        $response['success'] = $success;
        $response['general_message'] = $message;
        $response['errors']  = $errors;
        exit(json_encode($response));
	}
?>