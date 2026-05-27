const express = require('express');
const app = express();
const cors = require('cors')
const AuthRouter = require('./Routes/AuthRouter')

const corsOption = {
    origin: 'http://localhost:5173'
}

app.use(cors(corsOption))
app.use("/", (req, res) => {
    res.send('hellow world')
})

app.use('/api/auth', AuthRouter)

app.listen(process.env.PORT, () => {
    console.log(`server is running on : ${PORT}`);
});