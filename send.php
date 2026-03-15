<?php
/**
 * Обработчик формы контакта SHAR Production.
 * Отправка через SMTP Timeweb (PHPMailer). Настройки в config.php.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не разрешён.']);
    exit;
}

if (!file_exists(__DIR__ . '/config.php')) {
    echo json_encode(['success' => false, 'error' => 'Не найден config.php с настройками SMTP.']);
    exit;
}
require __DIR__ . '/config.php';

if (!file_exists(__DIR__ . '/vendor/autoload.php')) {
    echo json_encode(['success' => false, 'error' => 'Установите зависимости: composer install']);
    exit;
}
require __DIR__ . '/vendor/autoload.php';

// ——— Безопасная валидация и санитизация ———
$name    = isset($_POST['name']) ? trim((string) $_POST['name']) : '';
$contact = isset($_POST['contact']) ? trim((string) $_POST['contact']) : (isset($_POST['reach']) ? trim((string) $_POST['reach']) : '');
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';

// Защита от пустых обязательных полей
if ($name === '') {
    echo json_encode(['success' => false, 'error' => 'Укажите имя.']);
    exit;
}
if ($contact === '') {
    echo json_encode(['success' => false, 'error' => 'Укажите контакт (телефон, email или Telegram).']);
    exit;
}

// Ограничение длины (защита от огромных строк)
$name    = mb_substr($name, 0, 200);
$contact  = mb_substr($contact, 0, 300);
$message  = mb_substr($message, 0, 5000);

$subject = 'Заявка с сайта SHAR Production';
$body = "Имя: {$name}\nКонтакт: {$contact}\n\nСообщение:\n" . ($message !== '' ? $message : '(не указано)');

try {
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USERNAME;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = defined('SMTP_SECURE') && SMTP_SECURE === 'ssl'
        ? \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS
        : \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = SMTP_PORT;

    $mail->setFrom(defined('MAIL_FROM') ? MAIL_FROM : SMTP_USERNAME, MAIL_FROM_NAME);
    $mail->addAddress(MAIL_TO);
    $mail->Subject = $subject;
    $mail->Body    = $body;
    $mail->isHTML(false);

    $mail->send();
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    error_log('SHAR send.php PHPMailer: ' . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую.']);
}
