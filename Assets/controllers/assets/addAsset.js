const db = require('../../config/database');
const uuid = require('uuid')
const { insert } = require('@nodejscart/mysql-query-builder')
exports.addAsset = async (req, res) => {
    // res.send("added asset success");
    try {
        const { assetName,userID } = req.body;
        const assetID = uuid.v4();
        console.log(assetName);
        const addAsset = await insert('assets')
            .given({ AssetID: assetID, AssetName: assetName,UserID:userID })
            .execute(db)
        console.log("Asset", addAsset);
        return res.json({ message: "Assert added", data: addAsset })

    } catch (error) {
        console.log(error);
    }
}