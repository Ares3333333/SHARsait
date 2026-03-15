<?php
/**
 * Обработчик формы контакта SHAR Production.
 * Отправка через встроенную mail(). Настройки в config.php.
 */
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не разрешён.']);
    exit;
}

if (!file_exists(__DIR__ . '/config.php')) {
    echo json_encode(['success' => false, 'error' => 'Не найден config.php.']);
    exit;
}
require __DIR__ . '/config.php';

$name    = isset($_POST['name']) ? trim((string) $_POST['name']) : '';
$contact = isset($_POST['contact']) ? trim((string) $_POST['contact']) : (isset($_POST['reach']) ? trim((string) $_POST['reach']) : '');
$message = isset($_POST['message']) ? trim((string) $_POST['message']) : '';

if ($name === '') {
    echo json_encode(['success' => false, 'error' => 'Укажите имя.']);
    exit;
}
if ($contact === '') {
    echo json_encode(['success' => false, 'error' => 'Укажите контакт (телефон, email или Telegram).']);
    exit;
}

$name    = mb_substr($name, 0, 200);
$contact = mb_substr($contact, 0, 300);
$message = mb_substr($message, 0, 5000);

$subject = 'Заявка с сайта SHAR Production';
$body    = "Имя: {$name}\nКонтакт: {$contact}\n\nСообщение:\n" . ($message !== '' ? $message : '(не указано)');

$to = defined('MAIL_TO') ? MAIL_TO : '';
if ($to === '') {
    echo json_encode(['success' => false, 'error' => 'В config.php не задан MAIL_TO.']);
    exit;
}

$from = defined('MAIL_FROM') ? MAIL_FROM : $to;
$fromName = defined('MAIL_FROM_NAME') ? MAIL_FROM_NAME : 'SHAR Production';
$headers = [
    'From: ' . $fromName . ' <' . $from . '>',
    'Reply-To: ' . $from,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';
$sent = @mail($to, $subjectEncoded, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    error_log('SHAR send.php: mail() вернул false');
    echo json_encode(['success' => false, 'error' => 'Не удалось отправить заявку. Попробуйте позже или напишите нам напрямую.']);
}
