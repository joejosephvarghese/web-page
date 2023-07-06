const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const {connect}=require('./config/mongoos')
const userRouter = require('./Routes/userRouter');
const adminRouter = require('./Routes/adminRouter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// mongoose.connect("mongodb+srv://joejosephvarghese94:mg7tJ54WjsNPK22F@cluster0.rcescxu.mongodb.net/").then(()=> {
//     console.log('DB connection established');
// }).catch((err)=> {
//     console.log(err, 'Database connection Error');
// });
connect().then(()=>{
    console.log("datbase connected");
}).catch((error)=>{
    console.log(error);
})

app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, ()=> console.log('Server listening on port', PORT));


