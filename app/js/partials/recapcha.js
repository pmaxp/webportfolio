require("recaptcha");

function loadreCapcha() {
	
	
	var init = function() {
			_setUpListners();
			onloadCallback();
		};
		
	var _setUpListners = function(){	

	};	

	var onloadCallback = function() {
        grecaptcha.render('html_element', {
          'sitekey' : '6LecrBcTAAAAAHfyAgle2ugPYUMwLX_EHorgTygn'
        });
      };

	init();

};

module.exports = loadreCapcha;