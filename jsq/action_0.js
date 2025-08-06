// JavaScript Document
// CaGe Wei Frist JQ


	$(document).ready(function(){
			$('#menuCh_1').hide(); 
			$('#menuCh_2').hide();
			$('#menuCh_3').hide(); 			
				$('#menuM_1').mouseover(function(){
				$('#menuCh_1').fadeIn('fast'); 
				$('#menuCh_2').fadeOut('fast');
				$('#menuCh_3').fadeOut('fast');
			});
			/*
			$('#menuM_1').hover(
				function(){
					$('#menuCh_1').stop(true, true).slideDown(500);
				},
				function(){
					$('#menuCh_1').stop(true, true).slideUp(500);
				});
			
			*/
			/*
			$('#menuM_1').mouseout(function(){
				$('#menuCh_1').fadeOut('slow'); 
			});
			*/
			$('#menuM_2').mouseover(function(){
				$('#menuCh_1').fadeOut('fast');
				$('#menuCh_2').fadeIn('fast'); 				
				$('#menuCh_3').fadeOut('fast'); 
			});
			/*
			$('#menuM_2').mouseout(function(){
				$('#menuCh_2').fadeOut('fast');
			});
			*/
			$('#menuM_3').mouseover(function(){
				$('#menuCh_1').fadeOut('fast');
				$('#menuCh_2').fadeOut('fast');
				$('#menuCh_3').fadeIn('fast');
			});
			/*
			$('#menuM_3').mouseout(function(){
				$('#menuCh_3').fadeOut('fast');
			});
			*/
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
			
			
			/*				   
			if(window.innerHeight >= document.height){
				$('#footerBar').css('position','absolute');
				$('#footerBar').css('bottom','0');
				$('#footerBar').css('left','0');
			}else{
				$('#footerBar').css('position','relative');
			}
			*/
	});
