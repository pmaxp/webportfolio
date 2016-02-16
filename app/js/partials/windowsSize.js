;var $ = jQuery = require('jquery');

function winSize() {

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function () { // Прослушивает все события
			console.log('Прослушивает все события');
			$('#send_message_mail').on('submit', _sendMail); // отправка формы на почту
			$('form').on('keydown', '.has-error', _removeError); // удаляем красную обводку у элементов форм
			$('form').on('reset', _clearForm); // при сбросе формы удаляем также: тултипы, обводку, сообщение от сервера
		};

	var validateForm = function (form) { // Проверяет, чтобы все поля формы были не пустыми. Если пустые - вызывает тултипы
	     	 // console.log('Проверяем форму');

	      var elements = form
					      .find('input, textarea')
					      .not('input[type="file"], input[type="hidden"]'),
					      valid = true;					      
	      $.each(elements, function(index, val) {
	        var element = $(val),
	            val = element.val(),
	            pos = element.attr('qtip-position'),
	            place = element.attr('placeholder');	      		
	        if(val.length === 0 || val === place){
	        	element.addClass('has-error');
	        	_createQtip(element, pos);
	        	valid = false;
	        }
	      }); // each

	      return valid;
      };

	var _sendMail = function (ev) {
	      console.log('почта');
	      ev.preventDefault();// отмена стандартного действия элемента
	      //переменные 
	      var form = $(this);
	      console.log('Валидация формы');
	      // validateForm(form);

	  };

	var _removeError = function() { // Убирает красную обводку у элементов форм
	      // console.log('Красная обводка у элементов форм удалена');
	      $(this).removeClass('has-error');
		};

	var _clearForm = function(form) { // Очищает форму
		// console.log('Очищаем форму');	      
		var form = $(this);
		form.find('.form-contact-input').trigger('hideTooltip'); // удаляем тултипы
		form.find('.has-error').removeClass('has-error'); // удаляем красную подсветку
		// form.find('.error-mes, success-mes').text('').hide(); // очищаем и прячем сообщения с сервера	      
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
	      }else{
	        position = {
	          container: $('form'),
	          my: 'right center',
	          at: 'left center',
	          adjust: {
	            method: 'shift none'
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