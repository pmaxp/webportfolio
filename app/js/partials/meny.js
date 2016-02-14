;var $ = require('jquery');

function meny() {

	var textTest = 'module meny js connect!',
		menyBlock = $('.content-menu'),
		menyClose = $('.close_meny'),
		widthHtml = $('html').width(),
		fonM = $('.fon-mobile');

	var init = function() {
			_setUpListners();
		};
		
	var _setUpListners = function(){	
		$('.show_meny, .content-menu').on('click', _showMeny);
		// $('.show_meny, .content-menu, .close_meny').on('mouseleave',_hideMeny);
		$('.fon-mobile, .close_meny').on('click', _hideMeny);
		$(window).resize(_windowSize);
	};


	var _windowSize = function(){
		var mainPosition = $('.form-contact-input');
		console.log(widthHtml);
		widthHtml = $('html').width();
		console.log(widthHtml);
		if ( widthHtml > '1100'){
			_hideMeny();		
				
		};
		if ( widthHtml >= '767'){
			$.each(mainPosition, function(index, val) {
				var WidePosQtip = $(this).attr('qtip-posWide');
				$(this).attr('qtip-position', WidePosQtip);
				QtipTrue();
				console.log($(this).attr('qtip-position'));
			});
		};
		if ( widthHtml < '767'){
			$.each(mainPosition, function(index, val) {
				$(this).attr('qtip-position', 'mob');
				QtipTrue();
				console.log($(this).attr('qtip-position'));
			});			
		};		
		return widthHtml;
	};

	var QtipTrue = function(){
		if ($("div").is(".qtip")) {
			console.log('отработала наличие qtip');
			$(".form-contact-button__submit").click();
		};
	};


	var _showMeny = function(){
		if ( widthHtml <= '1100'){
			menyBlock.addClass('menuactiv');
			menyClose.css('display','inline-block')
			fonM.fadeIn(600);
			console.log('open');

			console.log(widthHtml);
		}
	};

	var _hideMeny = function(){	
		menyBlock.removeClass('menuactiv');
		menyClose.css('display','none');
		fonM.fadeOut(600);
		console.log('close');
		console.log(widthHtml);			
	};
	
	init();
	return textTest
}

module.exports = meny;

