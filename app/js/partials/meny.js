var $ = require('jquery');

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
		console.log(widthHtml);
		widthHtml = $('html').width();
		console.log(widthHtml);
		return widthHtml;
	};

	var _showMeny = function(){
		if ( widthHtml <= '1082'){
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

};

module.exports = meny;

