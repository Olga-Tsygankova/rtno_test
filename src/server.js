
const { Pool } = require('pg');

const app = express();

// Создание соединения с базой данных
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Helga1234',
    port: 5432,
});
