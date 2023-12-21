const express=require('express');
const router=express.Router();
const {verifyUsertoken}=require("../middlewares/getdata")
const {login,getdata}=require("../controllers/auth/login");
const {resetPassword}=require("../controllers/auth/reset-password")
const {forgotPassword}=require("../controllers/auth/forgot-password")

// router.route("/").post(login);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);
router.route("/getdata").get(getdata);
module.exports=router;