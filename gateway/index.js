const express=require('express');
const cors=require('cors');
const proxy=require('express-http-proxy');
require('dotenv').config();
const app=express();
const {PORT}=process.env;
app.use(express.json());
app.use(cors())
const {Auth}=require('./middleware/auth')


app.use('/login', proxy('http://localhost:8001'));
// app.use('/forgot-password', proxy('http://localhost:8001'));
app.use('/users',proxy('http://localhost:8001'));
app.use('/assets',Auth,proxy('http://localhost:8002'));

app.listen(PORT,()=>{
    console.log(`gateway is listening to port ${PORT}`);
})