// JavaScript Document
// CaGe Wei Frist JQ
// KuanNan C. modify @ 04.26.2016

	$(function(){
/*先將 關於景丰、服務項目與實績、空氣品質預報等 3 個子目錄收起來*/
		$('#menuCh_1').hide(); 
		$('#menuCh_2').hide();
		$('#menuCh_3').hide();
		$('#menuCh_6').hide();
	
        $('#menuM_1').mouseover(function(){
			$('#menuCh_1').stop(true, true).fadeIn(500);
			$('#menuCh_2, #menuCh_3, #menuCh_6').stop(true, true).fadeOut(250);
			});
		$('#menuM_2').mouseover(function(){
			$('#menuCh_2').stop(true, true).fadeIn(500);
			$('#menuCh_1, #menuCh_3, #menuCh_6').stop(true, true).fadeOut(250); 
			});
		$('#menuM_3').hover(function(){
			$('#menuCh_3').stop(true, true).fadeIn(500);
			$('#menuCh_1, #menuCh_2, #menuCh_6').stop(true, true).fadeOut(250);
			});
		$('#menuM_4').mouseover(function(){
			$('#menuCh_1, #menuCh_2, #menuCh_3').fadeOut(); 
			});
		$('#menuM_5').mouseover(function(){
			$('#menuCh_1, #menuCh_2, #menuCh_3').fadeOut(); 
			});
		$('#menuM_6').mouseover(function(){
			$('#menuCh_6').stop(true, true).fadeIn(500);
			$('#menuCh_1, #menuCh_2, #menuCh_3').stop(true, true).fadeOut(250); 
			});
		$('#menuPad').mouseleave(function(){
            $('#menuCh_1, #menuCh_2, #menuCh_3, #menuCh_6').fadeOut();  
            });	
		/*
		$('#menuM_1').mouseover(function(){
			$('#menuCh_1').fadeIn('fast'); 
			$('#menuCh_2').fadeOut('');
			$('#menuCh_3').fadeOut('');
			});
		$('#menuM_2').mouseover(function(){
			$('#menuCh_1').fadeOut('');
			$('#menuCh_2').fadeIn('fast'); 				
			$('#menuCh_3').fadeOut(''); 
			});
		$('#menuM_3').mouseover(function(){
			$('#menuCh_1').fadeOut('');
			$('#menuCh_2').fadeOut('');
			$('#menuCh_3').fadeIn('fast');
			});
		$('#menuM_4').mouseover(function(){
			$('#menuCh_1').fadeOut(); 
			$('#menuCh_2').fadeOut();
			$('#menuCh_3').fadeOut(); 
			});
		$('#menuM_5').mouseover(function(){
			$('#menuCh_1').fadeOut(); 
			$('#menuCh_2').fadeOut();
			$('#menuCh_3').fadeOut();
			});
		$('#menuM_6').mouseover(function(){
			$('#menuCh_1').fadeOut();  
			$('#menuCh_2').fadeOut();
			$('#menuCh_3').fadeOut();
			});
		$('#menuPad').mouseleave(function(){
            $('#menuCh_1').fadeOut();  
            $('#menuCh_2').fadeOut();
            $('#menuCh_3').fadeOut();
            });				   
			if(window.innerHeight >= document.height){
				$('#footerBar').css('position','absolute');
				$('#footerBar').css('bottom','0');
				$('#footerBar').css('left','0');
			}else{
				$('#footerBar').css('position','relative');
			}
		*/
	});
