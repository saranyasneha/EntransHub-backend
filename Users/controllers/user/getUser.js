const db = require('../../config/database');
const { select } = require('@nodejscart/mysql-query-builder')

exports.getUserdetails = async (req, res) => {
    try {
        const { userID } = req.body;
        console.log(userID);
        const userData = [];
        for (const userId of userID) {
            const getUser = await select('FirstName', 'LastName', 'Email')
                .from('users')
                .where('UserID', '=', userId)
                .execute(db);

            if (getUser.length > 0) {
                userData.push(getUser[0])
            }
        }
        if (userData.length == 0) {
            res.send({ message: "User does not exist" })
        } else {
            res.status(200).send({ message: "user details fetched", data: userData });
        }

    } catch (error) {
        console.log(error);
    }
}