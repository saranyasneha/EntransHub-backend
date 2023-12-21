const express=require("express");
const router=express.Router();

const {addUser,getUserProduct}=require("../controllers/user/addUser");
const {getUserdetails}=require('../controllers/user/getUser')

router.route("/addUser").post(addUser);
router.route("/userProduct").get(getUserProduct);
router.route("/getUserDetails").post(getUserdetails);


module.exports=router;
