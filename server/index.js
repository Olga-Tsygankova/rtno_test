import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors"

const app = express();


const MONGODB_URL = "mongodb+srv://olg358871:ybbxPWd6rDQL84lV@dialogs.4wopya5.mongodb.net/dialogbox?retryWrites=true&w=majority&appName=dialogs"
const PORT = 3003

const dialogSchema = new mongoose.Schema({
    id: Number,
    start_time: String,
    last_message_time: String,
    company: String,
    employee: String,
    bot_comments: String,
    client_comments: String,
    employee_comments: String
})
const Dialog = mongoose.model('Dialog', dialogSchema)

app.use(cors({
    origin: 'https://rtno-test-client.vercel.app/' // Разрешить доступ
}));
app.use(express.json())

mongoose
    .connect(MONGODB_URL)
    .then(() => {
        console.log("Connected to MongoDB ");
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`);
        });
    })
    .catch((err) => console.log(`DB connection error:${err}`));

app.get('/dialogs_with_comments', async (req, res) => {
    try {
        console.log("Запрос на получение данных из базы данных");
        const dialogs = await Dialog.find();
        console.log("Данные из базы данных успешно получены:", dialogs);
        console.log("Данные из базы данных успешно получены и отправлены");

        if (dialogs.length === 0) {
            res.status(200).json({message: "Диалогов не найдено"});
        } else {
            res.send(dialogs)
        }
    } catch (error) {
        console.error("Ошибка при выполнении запроса:", error);
        res.status(500).send('Ошибка при выполнении запроса');
    }
});
