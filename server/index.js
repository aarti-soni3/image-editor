require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter');
const { connectToDatabase } = require('./Config/db');
const port = process.env.PORT;

const corsOption = {
    origin: 'http://localhost:5173'
}

connectToDatabase();

app.use(cors(corsOption))
app.use(express.json())


app.use('/api/auth', AuthRouter)
app.use("/", (req, res) => {
    console.log('req', req.body)
    res.send('hellow world')
})


app.listen(port, () => {
    console.log(`server is running on : ${port}`);
});