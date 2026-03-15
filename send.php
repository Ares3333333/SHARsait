<?php
/**
 * Обработчик формы контакта SHAR Production.
 * Отправка через встроенную mail(). Настройки в config.php.
 * При запросе без Accept: application/json (нативная отправка с телефона) — редирект на contact.html?sent=1/0
 */
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

$isAjax = (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false);
$baseUrl = 'https://sharprod.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Метод не разрешён.']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html');
    }
    exit;
}

if (!file_exists(__DIR__ . '/config.php')) {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'Не найден config.php.']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=0');
    }
    exit;
}
require __DIR__ . '/config.php';

$name    = isset($_POST['name']) ? trim((string) $_POST['name']) : '';
$contact = isset($_POST['contact']) ? trim((string) $_POST['contact']) : (isset($_POST['reach']) ? trim((string) $_POST['reach']) : '');
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';

// Защита от header injection: удаляем переводы строк и возврат каретки из заголовков
$name    = str_replace(["\r", "\n", "%0d", "%0a"], '', $name);
$contact = str_replace(["\r", "\n", "%0d", "%0a"], '', $contact);
$message = str_replace(["\r", "\n", "%0d", "%0a"], '', $message);

if ($name === '') {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'Укажите имя.']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=0&err=name');
    }
    exit;
}
if ($contact === '') {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'Укажите контакт (телефон, email или Telegram).']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=0&err=contact');
    }
    exit;
}

$name    = mb_substr($name, 0, 200);
$contact = mb_substr($contact, 0, 300);
$message = mb_substr($message, 0, 5000);

$subject = 'Заявка с сайта SHAR Production';
$body    = "Имя: {$name}\nКонтакт: {$contact}\n\nСообщение:\n" . ($message !== '' ? $message : '(не указано)');

$to = defined('MAIL_TO') ? MAIL_TO : '';
if ($to === '') {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'В config.php не задан MAIL_TO.']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=0');
    }
    exit;
}

$from = defined('MAIL_FROM') ? MAIL_FROM : $to;
$fromName = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : 'SHAR Production';
$from = str_replace(["\r", "\n", "%0d", "%0a"], '', $from);
$fromName = str_replace(["\r", "\n", "%0d", "%0a"], '', $fromName);

$sent = false;
$useSmtp = defined('SMTP_HOST') && defined('SMTP_USERNAME') && defined('SMTP_PASSWORD') && SMTP_HOST !== '' && SMTP_USERNAME !== '' && SMTP_PASSWORD !== '';

if ($useSmtp && file_exists(__DIR__ . '/vendor/autoload.php')) {
    try {
        require __DIR__ . '/vendor/autoload.php';
        $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';
        $mail->isSMTP();
        $mail->Host       = SMTP_HOST;
        $mail->SMTPAuth   = true;
        $mail->Username   = SMTP_USERNAME;
        $mail->Password   = SMTP_PASSWORD;
        $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
        $mail->Port       = defined('SMTP_PORT') ? (int) SMTP_PORT : 465;
        $mail->setFrom($from, $fromName);
        $mail->addAddress($to);
        $mail->Subject = $subject;
        $mail->Body    = $body;
        $mail->isHTML(false);
        $mail->send();
        $sent = true;
    } catch (Exception $e) {
        error_log('SHAR send.php PHPMailer: ' . $e->getMessage());
    }
}

if (!$sent) {
    $headers = [
        'From: ' . $fromName . ' <' . $from . '>',
        'Reply-To: ' . $from,
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];
    $subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
    $sent = @mail($to, $subjectEncoded, $body, implode("\r\n", $headers));
}

if ($sent) {
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => true]);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=1');
    }
} else {
    error_log('SHAR send.php: mail() вернул false');
    if ($isAjax) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['success' => false, 'error' => 'Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую.']);
    } else {
        header('Location: ' . $baseUrl . '/contact.html?sent=0');
    }
}
