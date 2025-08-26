<!DOCTYPE html>
<!--<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html xmlns:mso="urn:schemas-microsoft-com:office:office" xmlns:msdt="uuid:C2F41010-65B3-11d1-A29F-00AA00C14882"><head>[if gte mso 9]><xml>
<mso:CustomDocumentProperties>
<mso:Categories msdt:dt="string"></mso:Categories>
<mso:Approval_x0020_Level msdt:dt="string"></mso:Approval_x0020_Level>
<mso:Assigned_x0020_To msdt:dt="string"></mso:Assigned_x0020_To>
</mso:CustomDocumentProperties>
</xml><![endif]-->
<html>
<head>
    <!--<meta http-equiv="Content-Language" content="zh-tw">-->
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="GENERATOR" content="Microsoft FrontPage 6.0">
    <meta name="ProgId" content="FrontPage.Editor.Document">
    <meta name="Accessible_website" content="本網站通過A+優先等級無障礙網頁檢測">
    <title>空氣污染排放量查詢系統首頁</title>
    <meta name="DC.Title" content="空氣污染排放量查詢系統" />
    <meta name="DC.Creator" content="環境部" />
    <meta name="DC.Subject" content="空氣污染排放量查詢系統" />
    <meta name="DC.Description" content="空氣污染排放量查詢系統" />
    <meta name="DC.Contributor" content="環境部" />
    <meta name="DC.Type" content="網頁" />
    <meta name="DC.Format" content="text" />
    <meta name="DC.Source" content="環境部" />
    <meta name="DC.Language" content="Chinese" />
    <meta name="DC.coverage.t.max" content="2008-02-09" />
    <meta name="DC.coverage.t.min" content="2007-11-09" />
    <meta name="DC.Publisher" content="環境部" />
    <meta name="DC.Date" content="2007-11-09" />
    <meta name="DC.Identifier" content="355000000I" />
    <meta name="DC.Relation" content=" " />
    <meta name="DC.Rights" content="環境部" />
    <meta name="DC.Keywords" content="空氣污染排放量查詢系統" />
    <meta name="Category.Theme" content="770" />
    <meta name="Category.Cake" content="C21" />
    <meta name="Category.Service" content="E41" />
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="icon" type="image/gif" href="animated_favicon1.gif" />
	<link rel="stylesheet" type="text/css" href="./css/default.css">
</head>
<body>
<%
ip=REQUEST.servervariables("REMOTE_ADDR")
Set FS = Server.CreateObject ("Scripting.FileSystemObject")
FileName = Server.MapPath("Counter.txt")
Set FR = FS.OpenTextFile(FileName,1,1)
mNum = FR.ReadLine
if session("ip")=ip then
else
  session("ip")=ip
  mNum=mNum+1
  Set FW = FS.OpenTextFile(FileName,2,1)
  FW.writeline mNum
  'response.write mNum
  Set FS = nothing
End if
FR.Close
Set FR = nothing
sNum =right("0000000000"&cstr(mNum),10)
%>
 <div id="wrapper">
        <div id="header">
               <div style="text-align: left;background-color: #ffffff;padding: 0;" colspan="2">
                        <a><img src="new_images/epa1.gif"  border="0" alt="環保署標誌"></a>
                        <div>
                            <p style="text-align: right;">
                                <a accesskey="u" href="#" title="上方連結區">:::上方連結區</a>
                                <a href="https://www.moenv.gov.tw/">
                                <img src="new_images/epa_homepage.png" alt="環保署首頁" border="0" height="22" width="88"></a>
                                <img src="new_images/line3-1.gif" alt="" border="0" height="18" width="6">
								<a href="Default.asp">
                                <img src="new_images/teds_homepage.png" alt="首頁" border="0" height="22" width="88"></a>
                                <img src="new_images/line3-1.gif" alt="" border="0" height="18" width="6">
                                <a href="new_webmap.htm">
                                    <img src="new_images/webmap.png" alt="網站導覽" border="0" height="22" width="88"></a>
                                <img src="new_images/line3-1.gif" alt="" border="0" height="18" width="6">
                                <a href="http://forum.moenv.gov.tw/EPASPS/SPSA/SPSA01001.aspx">
                                <img src="new_images/contactus-01.png" alt="聯絡我們" border="0" height="22" width="88"></a>
                            </p>
                        </div>
               </div>
					<div style="padding: 0;" colspan="2">
                        <img style="display: block;" src="new_images/title01.jpg" alt="空氣污染排放量查詢系統" >
                    </div>
					<div style="padding: 0;" colspan="2">
                        <img style="display: block;" src="new_images/image01.gif" alt=""  >
                    </div>
        </div>
		<div ID="contentWrap">
		<div ID="leftWrap">
        <div id="leftcolumn">
		   <a accesskey="L" href="#" title="左側連結區">:::左側連結區</a>
           <div>
			    <a href="new_news.htm"> <img  src="new_images/最新消息.png" alt="最新消息" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1.htm"> <img  src="new_images/排放清冊介紹.png" alt="排放清冊介紹" border="0" height="30" width="150"></a>
		   </div>
		   <div>
			    <a href="new_main1-0.htm"> <img src="new_images/排放清冊定義.png" alt="排放清冊定義" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-3.htm"> <img src="new_images/目的與用途.png" alt="目的與用途" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-8.htm"> <img src="new_images/清冊更新摘要.png" alt="清冊更新摘要" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-2.htm"> <img src="new_images/排放量推估方法.png" alt="排放量推估方法" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-5.htm"> <img src="new_images/活動強度來源.gif" alt="活動強度來源" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-4.htm"> <img src="new_images/推估教學.gif" alt="排放量推估手冊" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-7.htm"> <img src="new_images/資料不確定性.png" alt="資料不確定性" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-6.htm"> <img src="new_images/空間分配指標.gif" alt="空間分配指標" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main1-9.htm"> <img src="new_images/時間分配.png" alt="時間分配權重" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main2.htm"> <img src="new_images/資料下載.png" alt="排放量資料下載" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main2-0-1.htm"> <img src="new_images/TEDS9.0.gif" alt="TEDS9.0" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="https://apedus.moenv.gov.tw/"> <img src="new_images/排放量管理計畫.png" alt="排放量管理計畫" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main5.htm"> <img src="new_images/常見問題.png" alt="常見問題" border="0" height="30" width="150"></a>
           </div>
		   <div>
			    <a href="new_main4.htm"> <img src="new_images/人才招募.png" alt="人才招募" border="0" height="30" width="150"></a>
           </div>
		   <div style="vertical-align: middle;font-size:0.8em; color:#ffffff;">
                                            <p>　</p>
                                            <p>　</p>
                                            <p>　</p>
                                            <p>　</p>
                                            
                                            <p><b>&nbsp;&nbsp;&nbsp;瀏覽人次:<br/><%=sNum%></b><br></p>
            </div>
			<div style="text-align: center;">
                            <p>
                                <a href="http://www.handicap-free.nat.gov.tw/Applications/Detail?category=20160913093318" title="無障礙網站"> <img src="new_images/down_41.jpg" alt="通過A+優先等級無障礙網頁檢測" border="0" height="31" width="88"></a>
                            </p>
             </div>
		</div>
		<a accesskey="H" href="https://tedsnew.moenv.gov.tw/" title="回首頁">
        <div id="Content">
		<div class="search-form-wrapper">
			<form class="search-form-left" id="" action="">
				<div class="input-group" style="z-index:0;">
					<label for="search_e" title="搜尋" style="color: darkblue;">&nbsp;搜尋：</label>
					<input tabindex="1" type="search" name="search" id="search_e" class="search form-control" placeholder="請輸入或選擇關鍵字" />
					<span tabindex="1" id="search-bar" class="search-button search-button-v2" accesskey="s" title="搜尋 / Alt + s" name="search_btn" role="button"><i class='fa fa-search' aria-hidden="true"></i></span>
					<span tabindex="1" id="adv-search-bar" class="search-button search-button-v2" title="進階搜尋" name="advanced_search_btn" role="button"><i class='fa fa-search-plus' aria-hidden="true"></i></span>
				</div>
			</form>
		</div>
		<a accesskey="C" href="#" title="內容區"> :::內容區 </a>
		<div style="background-color: #ffffff;"><img src="new_images/banner3.gif" alt="關於排放清冊" border="0"></div>
        <span style="font-size:1.3em;">
		   <p>為維護空氣品質，瞭解空氣品質惡化的原因及研擬其可能的改善方案，掌握各種空氣污染物的排放來源、排放特性及其排放量是最基本的要求之一。</p>
           <p>我國空氣污染物排放量清查肇始於民國78年， 剛開始僅針對大台北高雄地區進行排放量調查推估，調查之基準年為民國77年(詳
           <a href="new_main1-8.htm">資料庫更新摘要</a>)，歷經多年的努力與更新，目前最新公告版本為<a href="new_main2-0-1.htm">TEDS9.0版</a>。此版本是以民國102年的活動量為基準(基準年)進行推估，涵蓋的區域亦已擴展至全國(含金門縣及連江縣)各縣市。</p>
           <p>如對所提供之<a href="new_main1-2.htm">排放量推估方法</a>等文件及所<a href="new_main2-0-1.htm">下載的資料</a>有任何疑問或意見，歡迎隨時<a href="http://forum.moenv.gov.tw/EPASPS/SPSB/SPSB01001.aspx">與我們聯絡</a>。</p>
            <p>&nbsp;</p>
       </span>
	   <div style="background-color: #ffffff;"> <img src="new_images/banner2.gif" alt="重要連結" border="0"> </div>
	   <div style="font-size:1.3em;"><img src="new_images/bt00e1-3.gif" alt=""  border="0" height="20" width="20"><a href="new_main1.htm">排放清冊介紹</a></div>
	   <div style="font-size:1.3em;"><img src="new_images/bt00e1-3.gif" alt=""  border="0" height="20" width="20"><a href="new_main2.htm">資料下載</a></div>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <br/>
	   <span style="font-size:1.3em;"><p style="text-align: right;">更新日期：2016/11/01</p></span>
	   </div>
	   </div>
	   </div>
        <div id="footer">
            <div style="padding: 0;" colspan="2">
                        <img style="display: block;" src="new_images/copyright_new.jpg" alt="行政院環保署 版權所有 環保署第二辦公室地址：台北市中正區秀山街4號14樓 總機：02-23712121（空保處&溫減管理室）" ></div>
        </div>
    </div>
</body>
</html>
