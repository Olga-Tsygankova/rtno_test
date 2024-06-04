//import axios from "axios";
//TODO:для стенда поменять на эти переменные

// const dbUrl = 'https://rtno-test-gamma.vercel.app';
//
// const dbUsername = 'default';
// const dbPassword = 'm6tsX1yDNAoV';
// const dbName = 'verceldb';
//
// axios.get(`${dbUrl}/api/ep-sparkling-wildflower-a4dpub6t-pooler.us-east-1.aws.neon.tech`, {
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Basic ${btoa(`${dbUsername}:${dbPassword}`)}`,
//     },
// })
//     .then((response) => {
//         console.log(response.data);
//     })
//     .catch((error) => {
//         console.error(error);
//     });

const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

// Создание соединения с базой данных
const pool = new Pool({
    user: 'default',
    host: 'ep-sparkling-wildflower-a4dpub6t-pooler.us-east-1.aws.neon.tech',
    database: 'verceldb',
    password: 'm6tsX1yDNAoV',
    port: 5432,
});
const app = express();

app.use(cors({
    origin: 'https://rtno-test-gamma.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/dialogs_with_comments', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM dialogs_with_comments');
        const dialogsWithComments = result.rows;
        // res.header('Access-Control-Allow-Origin', ' http://localhost:3000'); // use origin enough
        res.setHeader('Content-Type', 'application/json');
        res.json(dialogsWithComments);
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(3003, () => {
    console.log('Server is running on port 3003');
});
