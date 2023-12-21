const bcrypt = require('bcrypt');
// require("dotenv").config();
const db = require("../../config/database");
const { update, select } = require("@nodejscart/mysql-query-builder");
exports.resetPassword = async (req, res) => {
    try {
        const { userID, Password } = req.body;

        console.log("userid..........", userID);
        const user = await select("*")
            .from("users").where("UserID", "=", userID).execute(db);
        const oldPassword = user[0].Password;
        console.log("oldpassword", oldPassword);
        const newPasswordHash = await bcrypt.hash(Password, 10);
        const matchPassword = await bcrypt.compare(Password, oldPassword);
        console.log(matchPassword);
        if (!matchPassword) {
            const updatePassword = await update("users")
                .given({ Password: newPasswordHash })
                .where("UserID", "=", userID)
                .execute(db)

            console.log("updated password==>", updatePassword);
            return res.status(200).json({ message: "Password updated successfully" });
        }
        else{
            return res.status(401).json({message:"Password should be a new passsword"})
        }

    } catch (error) {
        console.log(error);
    }
}