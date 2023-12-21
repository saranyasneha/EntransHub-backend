const express=require('express');
const router=express.Router();
const {addAsset}=require('.//../controllers/assets/addAsset');

router.route("/").post(addAsset);

module.exports=router;