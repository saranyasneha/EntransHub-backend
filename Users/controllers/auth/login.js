
const bcrypt = require('bcrypt');
const db = require("../../config/database");
const jwt = require('jsonwebtoken');
const { select } = require('@nodejscart/mysql-query-builder');
const {JWT_SECRET }=process.env;
exports.getdata = async (req, res) => {
    res.send({ message: "data obtained" })
}

exports.login = async (req, res) => {
    try {
        const { Email, Password } = req.body;
        console.log(Email);

        const user = await select("*")
            .from("users")
            .where("Email", "=", Email)
            .execute(db);
        console.log("user", user);
        if (user.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const userID = user[0].UserID;
        const token = jwt.sign({ id: userID }, JWT_SECRET, { expiresIn: "1h" })
        console.log("tokenvvv", token);

        const hashedPassword = user[0].Password;
        const passwordMatch = await bcrypt.compare(Password, hashedPassword);

        if (passwordMatch) {
            return res.status(200).json({ message: 'Login successful!!!!', data: user, token: token });
        } else {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log("errr,,,,,,,,,,,,", error);
    }

}