<?php
header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки']);
    exit;
}

if (!file_exists(__DIR__ . '/config.php')) {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки']);
    exit;
}
require __DIR__ . '/config.php';

$name    = trim((string) ($_POST['name'] ?? ''));
$contact = trim((string) ($_POST['contact'] ?? $_POST['reach'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $contact === '') {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки']);
    exit;
}

$name    = mb_substr($name, 0, 200);
$contact = mb_substr($contact, 0, 300);
$message = mb_substr($message, 0, 5000);

$to      = MAIL_TO;
$from    = MAIL_FROM;
$fromName = MAIL_FROM_NAME;
$subject = 'Заявка с сайта SHAR Production';
$body    = "Имя: {$name}\nКонтакт: {$contact}\n\nСообщение:\n" . ($message !== '' ? $message : '(не указано)');

$headers = "From: {$fromName} <{$from}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$subjectEncoded = '=?UTF-8?B?' . base64_encode($subject) . '?=';

$sent = @mail($to, $subjectEncoded, $body, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Заявка отправлена']);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки']);
}
