<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 'Off'); //Disabled Error Info
$action = $_POST["action"];
//echo "action:".$action;
if($action){
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

	$name    = $_POST['userName'];
	$sex 	 = $_POST['sex'];
    $place   = $_POST['userUnits'];
	$phone   = $_POST['userPhone'];
	$email   = $_POST['userEmail'];
	$body    = $_POST['question'];
	$to   = "simenvi_it@simenvi.com.tw";
	$from   = "simenvi_it@simenvi.com.tw";
	// List of recipients
	$recipients = array(
		"simenvi_it@simenvi.com.tw" => "客服",
		"jim@simenvi.com.tw" => "管理部",
		"chien@simenvi.com.tw" => "管理部",
		"h63882@simenvi.com.tw" => "管理部",
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
	$headers  = "MIME-Version: 1.0\r\n";
	$headers .= "Content-type: text/TEXT; charset=UTF-8\r\n";
	$headers .= "To:".$to."\r\n";
	$headers .= "From:website<".$from.">\r\n";
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
		$mailer->Password = "Abcd=1234";// 設定驗證密碼 
		$mailer->CharSet = "utf-8";// 設定郵件編碼
		$mailer->Subject = $subject;// 設定郵件標題
		$mailer->From = $from;// 設定寄件者信箱
		$mailer->FromName = "景丰官方網站信件";// 設定寄件者姓名或標題
		$mailer->Body = $message;
		
	
	// Send a message to each recipient.
	// Headers that are unique for each message should be set within the foreach loop
	$numItems = count($recipients);
	$i = 0;
	foreach ($recipients as $emailx => $namex) {
		// Generate headers that are unique for each message
		$mailer->ClearAllRecipients();

		// $mailer->AddAddress($to, "客服");// 收件者郵件及名稱	
		$mailer->AddAddress($emailx, $namex);
		
		if(!$mailer->Send()) {
			if(++$i === $numItems) {
				echo "<script>alert('寄信失敗!')</script>";
			}
		}
		else {			
			if(++$i === $numItems) {
				echo "<script>alert('寄信成功!')</script>";
			}
		}
	}
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0"> 
	<title>景丰科技 SIMULATION</title>
	<meta name="keywords" content="景丰科技股份有限公司, 工程"/>    
    <!-- 網頁描述 -->
	<meta name="description" content="景丰科技股份有限公司成立於民國92 年，為行政院公共工程委員會核可之「工程技術顧問公司」，由一群資深的環境專業人員共同組成，主要的專業領域包括環境影響評估及環境監測、環境規劃管理、環境品質模擬、生態調查評估、許可申請等。藉由專業與誠信的服務， 凡承辦過的工作都能圓滿達成， 在業主與同業之間均獲得高度的評價。"/>
	<meta name="Author" content="景丰科技股份有限公司, 天井創意,Art Tangency Creation Co., Ltd."/>
	<meta name="copyright" content="Copyright © 2012 SIMLATION CO., LTD. All Rights Reserved">
    <!-- iCon圖示 -->
	<link rel="shortcut icon" href="favicon.ico">
    <!-- FB分享用圖 -->
	<!--<link rel="image_src" type="image/jpeg" href=""/>-->
    <link href="css/simenvi_basic.css" rel="stylesheet" type="text/css" />
    <link href="css/simenvi_menu.css" rel="stylesheet" type="text/css" />
    <link href="css/show_more_list.css" rel="stylesheet" type="text/css" />
	<!-- MOBILE MENU-->	 
    <link href="css/default.css" rel="stylesheet" type="text/css" />
    <link href="css/component.css" rel="stylesheet" type="text/css" />
    <link href="css/layout.css" rel="stylesheet" type="text/css" />
    <script src="jsq/modernizr.custom.js"></script>
    <!-- 外部連結 -->
	<script type="text/javascript" src="jsq/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="jsq/swfobject.js"></script>
    <script type="text/javascript" src="jsq/action.js"></script>
    <script type="text/javascript" src="jsq/simenvi_menu_script.js"></script>
</head>
<body>
<div id="main">
		
    <!-- Top Bar -->
    <iframe src="top_logo.html" id="logoIframe" scrolling="no" frameborder="0"></iframe>
</div>
    <?php /*?><? include('top_logo.php') ?><?php */?>
    <!-- Top Bar End -->
    
    <div class="BannerBG_L"></div><div class="BannerBG_R"></div>
    <div id="BannerShow_upon1"></div>
    
    <!-- menu 選單 -->
		<div id="menuPad">
		  <ul>
			  <li id="menuM_1" class="menuBtn_1-out" onmouseover="this.className='menuBtn_1-over'"  onmouseout="this.className='menuBtn_1-out'"></li>
			  <li id="menuM_2" class="menuBtn_2-out" onmouseover="this.className='menuBtn_2-over'"  onmouseout="this.className='menuBtn_2-out'"></li>
			  <li id="menuM_3" class="menuBtn_3-out" onmouseover="this.className='menuBtn_3-over'"  onmouseout="this.className='menuBtn_3-out'"></li>
				<!--<a href="air.html" target="_parent"><li id="menuM_3" class="menuBtn_3-out" onmouseover="this.className='menuBtn_3-over'"  onmouseout="this.className='menuBtn_3-out'"></li></a>-->
				<a href="links.html" target="_parent"><li id="menuM_4" class="menuBtn_4-out" onmouseover="this.className='menuBtn_4-over'"  onmouseout="this.className='menuBtn_4-out'"></li></a>
				<a href="contact.php" target="_parent"><li id="menuM_5" class="menuBtn_5-out" onmouseover="this.className='menuBtn_5-over'"  onmouseout="this.className='menuBtn_5-out'"></li></a>
				<!--<a href="download.html" target="_parent"><li id="menuM_6" class="menuBtn_6-out" onmouseover="this.className='menuBtn_6-over'"  onmouseout="this.className='menuBtn_6-out'"></li></a>-->
			  <li id="menuM_6" class="menuBtn_6-out" onmouseover="this.className='menuBtn_6-over'"  onmouseout="this.className='menuBtn_6-out'"></li>
		  </ul>
		  <div id="menuCh_1" class="chdMenuPad" style="left:35px; top:60px; z-index: 10;">
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="about.html" target="_parent">公司簡介　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="award.html" target="_parent">榮譽認證　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="human.html" target="_parent">人力資源　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="organiz.html" target="_parent">組織結構　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li>
		  </div>
		  <div id="menuCh_2" class="chdMenuPad" style="left:180px; top:60px; z-index: 10;">
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_1.html" target="_parent">環境影響評估及環境監測　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_2.html" target="_parent">空氣品質及河川水質之模擬</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_3.html" target="_parent">空氣污染物排放量調查　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_4.html" target="_parent">健康風險評估　　　　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_5.html" target="_parent">環境管理與資訊系統　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="service_6.html" target="_parent">生態檢核　　　　　　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li>
		  </div>
		  <div id="menuCh_3" class="chdMenuPad" style="left:350px; top:60px; z-index: 10;">
			  <!-- <li class="chdMenuPad_L"></li>
			  <li class="chdMenuPad_B">
				<span class="t_sp10"><a href="air.html" target="_parent">未來三天空品預報</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />  -->
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="air_his.html" target="_parent">重大空污事件模擬</a></span>
			</li>
			<li class="chdMenuPad_R"></li>
		  </div>
		  <div id="menuCh_6" class="chdMenuPad" style="left:810px; top:60px; z-index: 10;">
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="download_simenvi.html" target="_parent">公司介紹　　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="download_paper.html" target="_parent">景丰公司研究發表</a></span>
			</li>
			<li class="chdMenuPad_R"></li><p />
			<li class="chdMenuPad_L"></li>
			<li class="chdMenuPad_B">
				<span class="t_sp10"><a href="download_model.html" target="_parent">技術文件　　　　</a></span>
			</li>
			<li class="chdMenuPad_R"></li>
		  </div>
		</div>
	<!-- menu 選單 End -->

    <!-- MOBILE 選單 -->
	<div id="menuMobile">      
		<div id="dl-menu" class="dl-menuwrapper">
		<button class="dl-trigger">Open Menu</button>
		<ul class="dl-menu">
			<li>
			<a href="#">關於景丰 ...</a>
			<ul class="dl-submenu">
				<li><a href="about.html">公司簡介</a></li>
				<li><a href="award.html">榮譽認證</a></li>
				<li><a href="human.html">人力資源</a></li>
				<li><a href="organiz.html">組織結構</a></li>
			</ul>
			</li>
			<li>
			<a href="#">服務項目與實績 ...</a>
			<ul class="dl-submenu">
				<li><a href="service_1.html">環境影響評估及環境監測</a></li>
				<li><a href="service_2.html">空氣品質及河川水質之模擬</a></li>
				<li><a href="service_3.html">空氣污染物排放量調查</a></li>
				<li><a href="service_4.html">健康風險評估</a></li>
				<li><a href="service_5.html">環境管理與資訊系統</a></li>
				<li><a href="service_6.html">生態檢核</a></li>
			</ul>
			</li>
			<li>
			<a href="#">空污事件模擬 ...</a>
			<ul class="dl-submenu">
				<li>
				<a href="air_his.html">重大空污事件模擬</a>
				</li>
			</ul>
			</li>
			<li>
			<a href="links.html">相關連結</a>
			</li>
			<li>
			<a href="contact.php">聯絡我們</a>
			</li>
			<li>
			<a href="#">文件下載 ...</a>
			<ul class="dl-submenu">
				<li>
				<a href="download_simenvi.html">公司介紹</a>
				</li>
				<li>
				<a href="download_paper.html">景丰公司研究發表</a>
				</li>
				<li>
				<a href="download_model.html">技術文件</a>
				</li>
			</ul>
			</li>
		</ul>
		</div><!-- /dl-menuwrapper -->
	</div>
	<!-- MOBILE 選單 End -->

	<!--  -->
	<div id="Content">    	
		<div class="copyBasic">
        	<div class="copyBasic"><img src="images/title_5_3_connect.png" width="1000" height="27" /></div>
            <div class="copyBasic" style="width:90%; color:#333;">歡迎您來信洽詢任何問題，[景丰科技] 將有專人竭誠為您服務，謝謝您! <br />
              您所留下的個人資料，本公司僅用來答覆您的意見回饋，不會使用於其他用途。</div>
              <form action="" target="_self" method="post" >
              	<input type="hidden" name="action" value="true"/>
                <table width="92%" align="center" border="0" cellspacing="0" cellpadding="5">
                  <tr>
                    <td height="30" align="right">中文姓名:</td>
                    <td><input type="text" name="userName" id="userName" /></td>
                    <td>&nbsp;</td>
                    <td height="30">洽詢事項:</td>
                  </tr>
                  <tr>
                    <td width="150" height="30" align="right">性 別:</td>
                    <td width="171"><label>
                      <input type="radio" name="sex" id="radio" value="Male" /> 男
                      <input type="radio" name="sex" id="radio" value="Female" /> 女
                    </label></td>
                    <td width="16">&nbsp;</td>
                    <td rowspan="3"><textarea name="question" id="question" cols="60" rows="6"></textarea></td>
                  </tr>
                  <tr>
                    <td width="150" height="30" align="right">任職單位:</td>
                    <td><label>
                      <input type="text" name="userUnits" id="userUnits" />
                    </label></td>
                    <td width="16">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="150" height="30" align="right">連絡電話:</td>
                    <td><label>
                      <input type="text" name="userPhone" id="userPhone" />
                    </label></td>
                    <td width="16">&nbsp;</td>
                  </tr>
                  <tr>
                    <td width="150" height="30" align="right">E-mail</td>
                    <td><label>
                      <input type="text" name="userEmail" id="userEmail" />
                    </label></td>
                    <td width="16">&nbsp;</td>
                  </tr>
                  <tr>
                    <td height="30" align="right">&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td align="right">
                        <!--<a href="mailto:service@simenvi.com.tw?subject=官網詢問&body=" target="_blank"><div class="btn_Send-out" onmouseover="this.className='btn_Send-over'" onmouseout="this.className='btn_Send-out'"></div></a>-->
                        <input type="submit" value="" border="0"  class="btn_Send-out" onmouseover="this.className='btn_Send-over'" onmouseout="this.className='btn_Send-out'">
                        <input type="reset" value="" border="0" class="btn_Clean-out" onmouseover="this.className='btn_Clean-over'" onmouseout="this.className='btn_Clean-out'" />
                    </td>
                  </tr>
                </table>
  			</form>
        </div>
    
    	<table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
          <tr>
            <td background="images/title_5_1.png" height="27">&nbsp;</td>
            <td width="10%">&nbsp;</td>
            <td background="images/title_5_2.png" height="27">&nbsp;</td>
          </tr>
          <tr>
            <td align="left" valign="top"><br />台北市10663大安區復興南路二段286號4樓<br /><br />電話:02-23778011<br /><br />傳真:02-27393446<br /><br />統一編號:80509318<br /><br /></td>
            <td>&nbsp;</td>
            <td align="left" valign="top"><br />台南市70164東區東門路二段299號4樓<br /><br />電話:06-2098539<br /><br />傳真:06-2082115</td>
          </tr>
          <tr>
            <td><iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com.tw/maps?f=q&amp;source=s_q&amp;hl=zh-TW&amp;geocode=&amp;q=%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%BE%A9%E8%88%88%E5%8D%97%E8%B7%AF%E4%BA%8C%E6%AE%B5286%E8%99%9F4%E6%A8%93&amp;aq=&amp;sll=23.48575,119.49965&amp;sspn=8.005136,9.876709&amp;t=m&amp;brcurrent=3,0x3442aa2c194b66cd:0x1ea97d148ba72564,0,0x3442ac6b61dbbd9d:0xc0c243da98cba64b&amp;ie=UTF8&amp;hq=&amp;hnear=106%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%BE%A9%E8%88%88%E5%8D%97%E8%B7%AF%E4%BA%8C%E6%AE%B5286%E8%99%9F&amp;ll=25.024074,121.543216&amp;spn=0.007729,0.009645&amp;z=14&amp;output=embed"></iframe>
</div><br /><small><a href="https://maps.google.com.tw/maps?f=q&amp;source=embed&amp;hl=zh-TW&amp;geocode=&amp;q=%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%BE%A9%E8%88%88%E5%8D%97%E8%B7%AF%E4%BA%8C%E6%AE%B5286%E8%99%9F4%E6%A8%93&amp;aq=&amp;sll=23.48575,119.49965&amp;sspn=8.005136,9.876709&amp;t=m&amp;brcurrent=3,0x3442aa2c194b66cd:0x1ea97d148ba72564,0,0x3442ac6b61dbbd9d:0xc0c243da98cba64b&amp;ie=UTF8&amp;hq=&amp;hnear=106%E5%8F%B0%E5%8C%97%E5%B8%82%E5%A4%A7%E5%AE%89%E5%8D%80%E5%BE%A9%E8%88%88%E5%8D%97%E8%B7%AF%E4%BA%8C%E6%AE%B5286%E8%99%9F&amp;ll=25.024074,121.543216&amp;spn=0.007729,0.009645&amp;z=14" style="color:#0000FF;text-align:left">檢視較大的地圖</a></small>
            </td>
            <td>&nbsp;</td>
            <td align="right"><iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10389.093343753257!2d120.22327734036107!3d22.983380228247825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e769867929317%3A0xf820c39be6e0bb3d!2zNzAx5Y-w5Y2X5biC5p2x5Y2A5p2x6ZaA6Lev5LqM5q61Mjk56Jmf!5e0!3m2!1szh-TW!2stw!4v1451891967577"></iframe>
</div><br /><small><a href="https://www.google.com.tw/maps/place/701%E5%8F%B0%E5%8D%97%E5%B8%82%E6%9D%B1%E5%8D%80%E6%9D%B1%E9%96%80%E8%B7%AF%E4%BA%8C%E6%AE%B5299%E8%99%9F/@22.9833802,120.2232773,15.5z/data=!4m2!3m1!1s0x346e769867929317:0xf820c39be6e0bb3d" style="color:#0000FF;">檢視較大的地圖</a></small>
            </td>
          </tr>
        </table>
  	</div>
	<!-- News & Air End -->
</div>
<!-- main End -->

<!-- Footer Area -->
  <div id="footer">	
    <iframe src="footer.html" style="width:100%; height:76px;" scrolling="no" frameborder="0"></iframe>
</div>
	<?php /*?><? include('footer.php') ?><?php */?>
<!-- Footer End -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="jsq/jquery.dlmenu.js"></script>
  <script>
    $(function() {
      $( '#dl-menu' ).dlmenu({
        animationClasses : { classin : 'dl-animate-in-5', classout : 'dl-animate-out-5' }
      });
    });
  </script>
</body>
</html>
