const uuid = require("uuid");
const bcrypt = require('bcrypt');
require("dotenv").config();
const db = require('../../config/database')
const { insert, select } = require("@nodejscart/mysql-query-builder");
const { get } = require("../../routes/user");

exports.addUser = async (req, res) => {
    try {
        const { FirstName, LastName, Email, Password } = req.body;
        const userId = uuid.v4();
        const myEncPassword = await bcrypt.hash(Password, 10);
        const user = await select('*')
            .from('users')
            .where("Email", "=", Email)
            .execute(db)

        if (user.length > 0) {
            return res.status(400).json({ error: "User already exists!!" })
        }
        const addUser = await insert("users")
            .given({ UserID: userId, FirstName: FirstName, LastName: LastName, Email: Email, Password: myEncPassword })
            .execute(db)

        return res.status(201).json({ message: "User registered successfully", user: addUser })

    } catch (error) {
        console.log(error);
    }
}

exports.getUserProduct=async(req,res)=>{
    try {
        const getUser=await select("*")
        .from("users")
        .leftJoin("product").on("users.UserID","=","product.UserID")
        .execute(db)
        return res.status(202).json({message:"users with products","data":getUser})
    } catch (error) {
        console.log();
    }
}