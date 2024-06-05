import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import pg from 'pg';
import express from "express";

const app=express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

const port=process.env.PORT||3001

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

// Пример маршрута
app.get('/', (req, res) => {
    pool.query('SELECT * FROM dialogs_with_comments', (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Ошибка при выполнении запроса');
        }
        res.send("Сервер запущен")
        res.json(result.rows);
    });
});
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
