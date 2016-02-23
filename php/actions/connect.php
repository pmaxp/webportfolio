<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$mess = $_POST['mess'];

    $data = array();
 
        if (!$name or !$email or !$mess) { 
			$data['status'] = 'error';
			$data['text'] = 'ОШИБКА! Вы зaпoлнили нe всe пoля!';
		} else{
			if(!preg_match("/[0-9a-z_]+@[0-9a-z_^\.]+\.[a-z]{2,3}/i", $email)) {
			$data['status'] = 'error';
			$data['text'] = 'ОШИБКА! Неверно введен e-mail';
			}else{
				$data['status'] = 'OK';
				$data['text'] = 'Спасибо! Письмо отправлено!';
			}
		}

		header("Content-Type: application/json");
		echo json_encode($data);
        // обратите внимание, теперь мы можем писать красивые письма, с помощью html тегов ;-) 
        $message = '
        <head>
			<meta charset="UTF-8">	
		</head>
		<body>	
			<div style="font-family: sans-serif, arial, gelvetica; width: 100%; height: 100%; background: url("http://p-max-p.ru/img/comppattern.png");">
				<div style="max-width: 600px; margin: 0 auto; background: #eff3f7; color: #5a636b; border-radius: 5px; overflow: hidden; box-sizing: border-box; padding: 30px;">
					<p><b>Имя отправителя:</b>'.$name.'</p>
					<p><b>Контактный email:</b>'.$email.'</p>
					<p><b>Сообщение:</b>'.$mess.'</p>
				</div>
			</div>';

        $replymessage = '<html lang="ru-RU">
<head>
	<meta charset="UTF-8">	
</head>
<body>	
	<div style="font-family: sans-serif, arial, gelvetica; width: 100%; height: 100%; background: url("http://p-max-p.ru/img/comppattern.png");">
		<div style="max-width: 600px; margin: 0 auto; background: #eff3f7; color: #5a636b; border-radius: 5px; overflow: hidden; box-sizing: border-box; padding: 30px;">
			<div style="max-height: 50px; text-align: center; overflow: hidden;">
				<a style="max-height: 50px;"href="http://p-max-p.ru/">
					<img style="max-height: 50px;" src="http://p-max-p.ru/img/max.png">
				</a>
			</div>
			<p style="font-size: 1.3rem;">Спасибо за ваше сообщение, в ближайщее время я вам отвечу.</p>
			<p style="font-size: .8rem;">Копия вашего сообщения:</p>
		    <div style="padding-left: 40px; border-bottom: 1px solid #2fa5bc; border-top: 1px solid #2fa5bc; margin-bottom: 40px;">
			    <p><b>Имя отправителя:</b> '.$name.'</p>
			    <p><b>Контактный email:</b> '.$email.'</p>
			    <p><b>Сообщение:</b> '.$mess.'</p>
			</div>
			<div style="margin-bottom: 10px; text-align: center; font-weight: bold;">С наилучшими пожеланиями, Попов Максим.</div>	        
		    <div style="text-align: center;">
		        <a style="display: inline-block; padding: 10px; color: #38c6e2;"
			        href="http://p-max-p.ru/">
			        <span>сайт: p-max-p.ru</span>
			    </a>
		        <a style="display: inline-block; padding: 10px; color: #38c6e2;"
			        href="tel:+79268368152">
			        <span>тел: +7(926)836-81-52</span>
			    </a>
		        <a style="display: inline-block; padding: 10px; color: #38c6e2;"
			        href="skype:p_max_p?chat">
			        <span>skype: p_max_p</span>
			    </a>
		    </div>
	    </div>
    </div>';


        // подключаем файл класса для отправки почты 	
        require '../vendor/phpmailer/phpmailer/class.phpmailer.php';
        // require '../actions/config.php';

        // global $site;

        $mail = new PHPMailer();
        $mail->CharSet = "UTF-8";
        $mail->From = 'dev.pmaxp@gmail.com';      // от кого 
        $mail->FromName = 'p-max-p.ru';   // от кого 
        $mail->Subject = 'Письмо с p-max-p.ru';
        $mail->AddAddress('dev.pmaxp@gmail.com', 'Popov Maksim'); // кому - адрес, Имя
        $mail->IsHTML(true); // выставляем формат письма HTML
        $mail->Body = $message;

        // отправляем наше письмо 
        if (!$mail->Send())die ('Mailer Error: '.$mail->ErrorInfo);


        $mailDuble = new PHPMailer();
        $mailDuble->CharSet = "UTF-8";
        $mailDuble->From = 'dev.pmaxp@gmail.com'; // от кого 
        $mailDuble->FromName = 'p-max-p.ru';   // от кого 
		$mailDuble->Subject = 'Письмо с p-max-p.ru';
        $mailDuble->AddAddress($email, $name); // кому - адрес, Имя
        $mailDuble->IsHTML(true); // выставляем формат письма HTML
        $mailDuble->Body = $replymessage;

		// отправляем наше письмо 
		if (!$mailDuble->Send())die ('Mailer Error: '.$mailDuble->ErrorInfo);

        // если был файл, то прикрепляем его к письму 
        // if(isset($_FILES['attachfile'])) { 
        //          if($_FILES['attachfile']['error'] == 0){ 
        //             $mail->AddAttachment($_FILES['attachfile']['tmp_name'], $_FILES['attachfile']['name']); 
        //          } 
        // } 
        // если было изображение, то прикрепляем его в виде картинки к телу письма. 
        // if(isset($_FILES['attachimage'])) { 
        //          if($_FILES['attachimage']['error'] == 0){ 
        //             if (!$mail->AddEmbeddedImage($_FILES['attachimage']['tmp_name'], 'my-attach', 'image.gif', 'base64', $_FILES['attachimage']['type'])) 
        //                  die ($mail->ErrorInfo); 
        //             $mess .= 'А вот и наша картинка:<br /><img src="cid:my-attach" border=0><br />я показал как ее прикреплять, соответственно Вам осталось вставить ее в нужное место Вашего письма ;-) '; 
        //          } 
        // }
		
        


// if (!empty($_POST['submit'])) complete_mail(); 
// else show_form();
?> 