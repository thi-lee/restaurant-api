const client = require('../config/db');
const dbName = "users";
const collectionName = "usercoll";
const db = client.db(dbName).collection(collectionName);

exports.addUser = async function(req, res, next) {
    const user = req.body;
    await db.insertOne(user);
    res.send({kq: 1});
}