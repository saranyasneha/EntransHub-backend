const express=require('express');
require("dotenv").config();
const app=express();
const addAsset=require('./routes/assets');
app.use(express.json());

app.use('/add-asset',addAsset);
app.get("/",(req,res)=>{
    res.json({message:"from asset service"})
})


app.listen(8002,()=>{
    console.log(`server is running at port 8002 for (asset service)`);
})