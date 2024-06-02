const express = require('express');
const {Pool} = require('pg');
const cors = require('cors');

// Создание соединения с базой данных
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Helga1234',
    port: 5432,
});
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://rtno-test-gamma.vercel.app/');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.get('/dialogs_with_comments', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM dialog_with_comments');
        const dialogsWithComments = result.rows;
        res.setHeader('Content-Type', 'application/json');
        res.json(dialogsWithComments);
        client.release();
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).send('Error retrieving data');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
