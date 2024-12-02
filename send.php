<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($name) || empty($phone) || empty($email) || empty($message)) {
        echo json_encode(['message' => 'Todos los campos son obligatorios.']);
        exit;
    }

    $mail = new PHPMailer(true);

    try {
        /*$mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->Host = 'smtp.example.com'; 
        $mail->Username = 'tu-correo@example.com';
        $mail->Password = 'tu-contraseña'; 
        $mail->Port = 587;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        // Configuración del correo
        $mail->setFrom('tu-correo@example.com', 'Formulario de Contacto');
        $mail->addAddress('destinatario@example.com'); // Cambiar por el destinatario
        $mail->isHTML(true);
        $mail->Subject = 'Nuevo mensaje de contacto';
        $mail->Body = "
            <h1>Nuevo mensaje de contacto</h1>
            <p><strong>Nombre:</strong> {$name}</p>
            <p><strong>Teléfono:</strong> {$phone}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Mensaje:</strong><br>{$message}</p>
        ";

        $mail->send();*/
        echo json_encode(['message' => 'Mensaje enviado con éxito.']);
    } catch (Exception $e) {
        echo json_encode(['message' => 'Error al enviar el correo: ' . $mail->ErrorInfo]);
    }
} else {
    echo json_encode(['message' => 'Método no permitido.']);
}
?>
