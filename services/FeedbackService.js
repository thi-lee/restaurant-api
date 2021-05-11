const client = require('../config/db');
const dbName = "mydishes";
const collectionName = "Feedback";
const db = client.db(dbName).collection(collectionName);
const ObjectId = require('mongodb').ObjectID;

exports.getAll = async function(req, res, next) {
    const page = req.params.page;
    const limit = 7;
    const skip = limit * (page - 1)
    
    const result = await db
    .find()
    .sort( {name: 1} )
    .skip(skip)
    .limit(limit)
    .toArray();
    const resp = [];
    for (const obj of result) {
        resp.push({
            id: obj["_id"].toString(),
            name: obj["name"],
            description: obj["content"],
            price: obj["rating"]
        });
    }
    res.send(resp);
}