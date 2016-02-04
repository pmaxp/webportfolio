var $ = require('jquery');

function test() {

	var textTest = 'module test js connect!'
	
	var init = function() {
			_setUpListners();
			_test();
		};
		
	var _setUpListners = function(){	

	};	

	var _test = function(){	
		console.log(textTest)
	};

	init();

};

module.exports = test;

