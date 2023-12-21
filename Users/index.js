const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());
const {login}=require('../Users/controllers/auth/login')
const {PORT}=process.env
//import all the routes
const auth=require('./routes/auth');
const user=require('./routes/user');
const { forgotPassword } = require("./controllers/auth/forgot-password");

app.use("/",auth);
app.use("/",user);
app.post('/',login);
app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT} for (users service)`);
});