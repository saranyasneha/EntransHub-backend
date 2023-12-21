const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.Auth = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.status(402).send("Access Denied!!")
    try {
        token = token.split(' ')[1];
        let verifiedUser = jwt.verify(token, JWT_SECRET);
        if (!verifiedUser) {
            return res.status(401).send("unauthorized request")
        }
        next();
    } catch (error) {
        console.log(error);
        return res.json({ "Error": error })
    }
}