var strHref = "";
var allTime = 0; //10000;	//設定倒數秒數
function confirmDownload(href) {
	strHref = href;
	$.blockUI({
		message: $('#confirmForm'),
		target: "#Main",
		showOverlay: true,
		css: {
			/*height: '147px',
			width: '322px',*/
			border: 'none',
			cursor: 'default',
			backgroundColor: 'white'
		},
		overlayCSS:{
			backgroundColor: '#D2D2D2',
			cursor: 'default'
		}
	});
	allTime = 15000;
	$("#mydiv").show();
	$("#mydiv").css("border","1px solid red");
	DoTimeCount();	//開始倒數
}
function eventConfirm(isAgree) {
	if (isAgree) {
		window.open(strHref,"_parent");
	}
	$.unblockUI();
}

$(document).ready(function(){
});

function DoTimeCount()
{
	if(allTime <= 0){
		//時間到
		$("#mydiv").hide();
		$("#btnagree").attr('disabled', false);
	}
	else
	{
		var timeTmp = allTime/1000;
		var currentTimeHMS = TimeToHMS(timeTmp)
		$("#mydiv").text(currentTimeHMS)
		setTimeout("DoTimeCount()",1000);
		$("#btnagree").attr('disabled', true);
	}
	allTime-=1000;
}

/* convert seconds value to H:MM:SS format */
function TimeToHMS(seconds)
{
	sec = seconds % 60;
	temp = ( seconds - sec ) / 60;

	minute = temp % 60;
	hour = (temp - minute) / 60;

	if(!(isFinite(sec) && isFinite(minute) && isFinite(hour))) /* invalid time */
	{
		return ("");
	}

	time_str = hour;
	time_str += ":";
	time_str+=(minute<10)?("0"+minute):minute;
	time_str+=":";
	time_str+=(sec<10)?("0"+sec):sec;

	return (time_str);
}