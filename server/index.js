require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
const AuthRouter = require('./Routes/authRouter');
const ImageRouter = require('./Routes/imageRouter');
const { connectToDatabase } = require('./Config/db');
const port = process.env.PORT;

const corsOption = {
    origin: 'http://localhost:5173'
}

connectToDatabase();

app.use(cors(corsOption))
app.use(express.json())

app.use('/api/auth', AuthRouter)
app.use('/api/image', ImageRouter)

app.listen(port, () => {
    console.log(`server is running on : ${port}`);
});