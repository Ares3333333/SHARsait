<?php
/**
 * Скопируйте в config.php и заполните.
 * Для работы заявок со ВСЕХ устройств (не только с вашего ПК) нужен SMTP.
 */
define('MAIL_TO', 'start@sharprod.com');
define('MAIL_FROM', 'start@sharprod.com');
define('MAIL_FROM_NAME', 'SHAR Production');

/* SMTP (обязательно для приёма заявок от всех пользователей на Timeweb) */
define('SMTP_HOST', 'smtp.timeweb.ru');
define('SMTP_PORT', 465);
define('SMTP_USERNAME', 'start@sharprod.com');
define('SMTP_PASSWORD', 'ВАШ_ПАРОЛЬ_ОТ_ПОЧТЫ');
