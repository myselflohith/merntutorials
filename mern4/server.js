const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

mongoose.connect('mongodb+srv://lohith:5unnyD4ys!@cluster0.xwokvhe.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true});

mongoose.connection.on('connected', () => {
    console.log("mongoose connected");
})

const app = express();

app.use(cors());
app.use(bodyParser.json());
const PORT = 3001;


const User = require('./backendmodels/userModel');
const Staff = require('./backendmodels/staffModel');

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



app.post('/api/login', async(req,res) =>{
    try{
        const {email, password} = req.body;

        console.log(email)
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({message:' User not found'})
        }
        const isPasswordvalid = await bcrypt.compare(password, user.password);

        if(!isPasswordvalid){
            return res.status(401).json({message:'Password wrong'})
        }

        const token = jwt.sign({userId:user._id}, 'ilovejs', {expiresIn: '1h'});
        return res.status(200).json({token})
        

    }catch(error){

    }

});


app.post('/api/staff', async (req, res) => {
    try {
      const { name } = req.body;
  
      // Initialize availability with all weekdays
      const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const initialAvailability = weekdays.map(day => ({
        day,
        from: '',
        to: ''
      }));
  
      const newStaff = new Staff({ name, availability: initialAvailability });
      await newStaff.save();
      res.json({ success: true, message: 'Staff added successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  });


  app.get('/api/staff', async(req,res) =>{
    try{
        const allStaff = await Staff.find();
        res.json(allStaff);
    }
    catch(error){

    }
  })


app.get('/api/name', (req, res) =>{
    res.send("Im okay");
});

app.get('/api/email', (req, res) =>{
    res.send("lohith@poornam.com");
});

app.listen(PORT, () =>{
    console.log(`server is running ${PORT}`);
})