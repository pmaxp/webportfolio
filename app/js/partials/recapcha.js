;var $ = jQuery = require('jquery');

require("recaptcha");

function loadReCapcha() {
	
	
	var init = function() {
			onloadCallback();
		};
		
	var _setUpListners = function(){	

	};	

	var onloadCallback = function() {
		console.log('Инициализация модуля capcha');
        grecaptcha.render('html_element', {
          'sitekey' : '6LecrBcTAAAAAHfyAgle2ugPYUMwLX_EHorgTygn'
        });
      };

	init();

};

module.exports = loadReCapcha;