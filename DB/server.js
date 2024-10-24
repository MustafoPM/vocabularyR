const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware для обработки JSON-данных
app.use(bodyParser.json());
app.use(express.static('public')); // Папка с вашим HTML, CSS и JS

// Настройки транспорта для отправки email
const transporter = nodemailer.createTransport({
    service: 'gmail', // Используйте ваш email-сервис, например, Gmail
    auth: {
        user: 'your-email@gmail.com', // Ваша почта
        pass: 'your-email-password' // Пароль от почты
    }
});

// Путь к файлу для сохранения email'ов
const emailsFile = path.join(__dirname, 'emails.txt');

// Маршрут для обработки подписки
app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    // Сохраняем email в файл
    fs.appendFile(emailsFile, `${email}\n`, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка сохранения почты' });
        }

        // Настройки письма
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: 'your-email@gmail.com', // Ваша почта
            subject: 'Новая подписка на новости',
            text: `Новая подписка с почтой: ${email}`
        };

        // Отправляем уведомление на почту
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ error: 'Ошибка отправки почты' });
            }
            res.json({ message: 'Подписка успешна!' });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});