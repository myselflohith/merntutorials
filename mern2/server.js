const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');

mongoose.connect('mongodb+srv://lohith:5unnyD4ys!@cluster0.xwokvhe.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log("mongoose connected");
})

const app = express();

app.use(cors());
app.use(bodyParser.json());
const PORT = 3001;


const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema, 'datauser');

app.post('/api/register', async (req,res) =>{
    try{
        const { username, email, password} = req.body;
        console.log(username,email,password);

        const hashedpassword = await bcrypt.hash(password, 10)


        const user = new User({
            username,
            email,
            password: hashedpassword
        });

        await user.save();
        res.status(201).json({
            message: "user registered"
        });



    }
    catch(error){
        console.log('error while reg:', error);
        res.status(500).json({
            message: ' Internal server error'
        });
    }
});


app.get('/api/name', (req, res) =>{
    res.send("Im okay");
});

app.get('/api/email', (req, res) =>{
    res.send("lohith@poornam.com");
});

app.listen(PORT, () =>{
    console.log(`server is running ${PORT}`);
})