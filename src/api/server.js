const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Подключение к базе данных
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Пример маршрута
app.get('/dialogs_with_comments', (req, res) => {
    pool.query('SELECT * FROM dialogs_with_comments', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Ошибка при выполнении запроса');
        }
        res.json(result.rows);
    });
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});