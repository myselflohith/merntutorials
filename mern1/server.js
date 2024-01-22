const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://lohith:5unnyD4ys!@cluster0.xwokvhe.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log("mongoose connected");
})

const app = express();

app.use(cors());

const PORT = 3001;

app.get('/api/name', (req, res) =>{
    res.send("Im okay");
});

app.get('/api/email', (req, res) =>{
    res.send("lohith@poornam.com");
});

app.listen(PORT, () =>{
    console.log(`server is running ${PORT}`);
})