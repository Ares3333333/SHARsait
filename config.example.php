<?php
/**
 * Пример настроек SMTP. Скопируйте в config.php и подставьте свои данные.
 * config.php добавлен в .gitignore — пароли не попадут в репозиторий.
 */
define('SMTP_HOST', 'smtp.timeweb.ru');
define('SMTP_PORT', 465);
define('SMTP_SECURE', 'ssl');
define('SMTP_USERNAME', 'YOUR_EMAIL');
define('SMTP_PASSWORD', 'YOUR_PASSWORD');
define('MAIL_TO', 'YOUR_RECEIVER_EMAIL');
define('MAIL_FROM', 'YOUR_EMAIL');
define('MAIL_FROM_NAME', 'YOUR_FROM_NAME');
