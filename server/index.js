import cookieParser from "cookie-parser"
import cors from "cors"
import "dotenv/config"
import pg from 'pg';
import express from "express";

const app=express()
const corsOptions = {
    origin: 'https://rtno-test-client.vercel.app',
    optionsSuccessStatus: 200
};
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rtno-test-client.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


const port=process.env.PORT||3001

const pool = new pg.Pool({
    user: 'default',
    host: 'ep-sparkling-wildflower-a4dpub6t-pooler.us-east-1.aws.neon.tech',
    database: 'dialogs',
    password: 'm6tsX1yDNAoV',
    port: 5432,
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// Пример маршрута
app.get('/dialogs_with_comments', (req, res) => {
    console.log("Запрос на получение данных из базы данных");
    pool.query('SELECT * FROM dialogs_with_comments', (error, result) => {
        if (error) {
            console.error("Ошибка при выполнении запроса:", error);
            return res.status(500).send('Ошибка при выполнении запроса');
        }
        console.log("Данные из базы данных успешно получены и отправлены");
        res.json(result.rows);
    });
});
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
