;var $ = jQuery = require('jquery');

require('qtip2');

function validation() {

	var init = function(){
		console.log('Инициализация модуля validation');
		_setUpListners();
	};
	var divCapcha = $('.g-recaptcha'),
		valMail = /.+@.+\..+/i,
		inputMail = $('.form-contact-input__email'),
		defaultMail = inputMail.attr('qtip-default');

	// $(document).ready(function(){
 //  		divCapcha.html(html);
 //  		console.log($('iframe'));
	// });
	


	var _setUpListners = function () { // Прослушивает все события
			console.log('Прослушивает все события');
			$('#send_message_mail').on('submit', _sendMail); // отправка формы на почту
			$('form').on('keydown', '.has-error', _removeError); // удаляем красную обводку у элементов форм
			$('form').on('reset', _clearForm); // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
			$('.g-recaptcha').on("click", _removeValidCapcha);
			// $('.g-recaptcha').on('click','div', _removeValidCapcha); // клик по капче
		};

	function validateForm (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	     	 // console.log('Проверяем форму');
			var response = grecaptcha.getResponse(),
				elements = form
					      .find('input, textarea')
					      .not('input[type="file"], input[type="hidden"]'),					      
					      valid = true;

			inputMail.attr('qtip-content', defaultMail);

			console.log(grecaptcha);

			 if(inputMail.val() != ''){
		      	if(inputMail.val().search(valMail) == 0){		      		
		      	}else{
		      		inputMail.attr('qtip-content', 'Введите коректный email');
					inputMail.addClass('has-error');
					_createQtip(
						inputMail,
						inputMail.attr('qtip-position')
						)
					valid = false;
				}
        	}
	      $.each(elements, function(index, val) {
	        var element = $(val),
	            val = element.val(),
	            pos = element.attr('qtip-position'),
	            place = element.attr('placeholder');	      		
	        if(val.length === 0 || val === place){
	        	element.addClass('has-error');
	        	_createQtip(element, pos);
	        	valid = false;
	        	console.log('проверка не прошла');
	        }
	      }); // each	      	
	     
  		if(response.length === 0){
  			divCapcha.addClass('has-error');
        	valid = false;
        	console.log('проверка не прошла Капча');
        }
        if(response.length != 0)
	    {
	    	divCapcha.removeClass('has-error');
			console.log('Капча прошла'); 
	    }

	      return valid;
      };

	var _sendMail = function (ev) {
	      console.log('почта');
	      
	      ev.preventDefault();// отмена стандартного действия элемента
	      var form = $(this);
	      console.log('Валидация формы');
	      // validateForm(form);  
           url = './php/actions/connect.php',
           myServerGiveAnAnswer = _ajaxForm(form, url);
      
      	if (!validateForm(form)) return false;

	      var answerServer = _ajaxForm(form, url);
	          answerServer.done(function (ans) {
			      var successBox = form.find('.success-mes'),
			            errorBox = form.find('.error-mes');
			      if(ans.status === 'OK'){        
			        errorBox.hide();
			        successBox.text(ans.text).show();        
			      }else{
			        successBox.hide();
			        errorBox.text(ans.text).show();
			      }
	      });
	  };

	var _ajaxForm = function(form, url){    

	    var data = form.serialize();
	    	
	    // запрос на сервер
	    return $.ajax({
	        url: url,
	        type: 'POST',
	        dataType: 'json',
	        data: data,
	    }).fail(function(ans){
	       // console.log('Ошибка в PHP');
	       form.find('.error-mes').text('На сервере произошла ошибка').show();
	    });   
	     
	  	};

	var _removeValidCapcha = function() { // Убирает красную обводку у элементов форм
		// divCapcha.removeClass('has-error');
		alert('click for capcha');
	};

	var _removeError = function() { // Убирает красную обводку у элементов форм
	      // console.log('Красная обводка у элементов форм удалена');
	      $(this).removeClass('has-error');
		};

	var _clearForm = function(form) { // Очищает форму

		var form = $(this);
		form.find('.form-contact-input').trigger('hideTooltip'); // удаляем тултипы
		form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
		form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера
		grecaptcha.reset();
		};

	var _createQtip = function (element, position) { // Создаёт тултипы
	      // console.log('Создаем тултип');
	      // позиция тултипа
	      if (position === 'right') {
	        position = {
	          container: $('form'),
	          my: 'left center',
	          at: 'right center'
	        }
	    } else { 
			if (position === 'mob') {
				position = {
				container: $('form'),
				my: 'bottom center',
				at: 'top center'
				}
			} else {
				position = {
				container: $('form'),
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
					}
				}
			}
		}
	      // инициализация тултипа
	      element.qtip({
	        content: {
	          text: function() {
	            return $(this).attr('qtip-content');
	          }
	        },
	        
	        show: {
	          event: 'show'
	        },
	        hide: {
	          event: 'keydown hideTooltip'
	        },
	        position:	        	
	        	position,
	        		style: {	         
	          		classes: 'qtip-mystyle qtip-rounded',
	          			tip: {
	            			height: 10,
	            			width: 16
	          			}
	        		}
	      }).trigger('show');	      
    	};
    	
	init();
};

module.exports = validation;