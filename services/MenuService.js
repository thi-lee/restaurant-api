const client = require('../config/db');
const dbName = "mydishes";
const collectionName = "Collection";
const db = client.db(dbName).collection(collectionName);
const ObjectId = require('mongodb').ObjectID;

exports.getById = async function (req, res, next) {
    const id = req.params.id;
    
    const result = await db.find({"_id": ObjectId(id)}).toArray();
    res.send(result);
}

exports.getAll = async function (req, res, next) {
    const page = req.params.page;
    console.log(page);
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
            description: obj["description"],
            price: obj["price"]
        });
    }
    res.send(resp);
}

exports.insertDish = async function(req, res, next) {
    const dish = req.body;

    await db.insertOne(dish);
    res.send({ kq: 1 });
}

exports.removeDish = async function(req, res, next) {
    const dishId = req.body._id;

    await db.deleteOne({"_id": ObjectId(dishId)});
    res.send({ kq: 1 });
}

exports.changeDishInfo = async function(req, res, next) {
    const dishId = req.body._id;
    const update = req.body.update;
    await db.updateOne({"_id": ObjectId(dishId)}, {$set: update});
    await res.send({ kq: 1 });
}

exports.searchInfo = async function(req, res, next) {
    const searchText = req.body.search;
    const result = await db.find({ $text: { $search: searchText}})
    await res.send(result);
}