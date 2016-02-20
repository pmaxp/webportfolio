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
			<p><b>Имя отправителя:</b>'.$name.'</p>
			<p><b>Контактный email:</b>'.$email.'</p>
			<p><b>Сообщение:</b>'.$mess.'</p>';

        $replymessage = ' 
	<p>Спасибо за ваше сообщение, в ближайщее время я вам отвечу.</p>
        <hr>
    <p><b>Имя отправителя:</b>'.$name.'</p>
    <p><b>Контактный email:</b>'.$email.'</p>
    <p><b>Сообщение:</b>'.$mess.'</p>
    <p><b>Сообщение:</b>'.$mess.'</p>
        <hr>
    <div>
        С наилучшими пожеланиями, Максим Попов.</br>
        <a href="http://p-max-p.ru/">p-max-p.ru</a></br>
        <a href="tel:+79268368152">тел. +7(926)836-81-52</a></br>
        <a href="skype:p_max_p?chat">skype: p_max_p</a></br>
    </div>';


        // подключаем файл класса для отправки почты 	
        require '../vendor/phpmailer/phpmailer/class.phpmailer.php';
        // require '../actions/config.php';

        // global $site;

        $mail = new PHPMailer(); 
        $mail->From = 'dev.pmaxp@gmail.com';      // от кого 
        $mail->FromName = 'p-max-p.ru';   // от кого 
        $mail->Subject = 'Письмо с p-max-p.ru';
        $mail->AddAddress('dev.pmaxp@gmail.com', 'Popov Maks'); // кому - адрес, Имя
        $mail->IsHTML(true); // выставляем формат письма HTML
        $mail->Body = $message;

        // отправляем наше письмо 
        if (!$mail->Send())die ('Mailer Error: '.$mail->ErrorInfo);


        $mailDuble = new PHPMailer(); 
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