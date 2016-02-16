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
				$data['text'] = 'Отправлено на сервер!';
			}
		}

		header("Content-Type: application/json");
		echo json_encode($data);
        // обратите внимание, теперь мы можем писать красивые письма, с помощью html тегов ;-) 
        $message = ' 
	<b>Имя отправителя:</b>'.$name.'<br />
	<b>Контактный email:</b>'.$email.'<br /> 
	'.$mess;

        // подключаем файл класса для отправки почты 	
        require '../vendor/phpmailer/phpmailer/class.phpmailer.php';
        // require '../actions/config.php';

        // global $site;

        $mail = new PHPMailer(); 
        $mail->From = 'anbelmp@gmail.com';      // от кого 
        $mail->FromName = 'p-max-p.ru';   // от кого 
        $mail->AddAddress('dev.pmaxp@gmail.com', 'Maks'); // кому - адрес, Имя
        $mail->IsHTML(true); // выставляем формат письма HTML 
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
       $mail->Body = $message;

        // отправляем наше письмо 
		if (!$mail->Send())die ('Mailer Error: '.$mail->ErrorInfo)





// if (!empty($_POST['submit'])) complete_mail(); 
// else show_form();
?> 