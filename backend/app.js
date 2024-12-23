const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();
const router = require('./routes/route');
const cookieParser = require('cookie-parser');
const port = 3020;
const  {connectmongodb} =require('./connection/connection')
app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))
connectmongodb('mongodb://localhost:27017/mytalorzone').then(()=>{console.log("mongodb connected successfully")}).catch((err)=>{console.log(err)});
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(router);
app.listen(port,()=>{
    console.log("server is listening on port" + port);
})