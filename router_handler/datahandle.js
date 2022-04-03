const bcrypt = require("bcryptjs");
const { MongoClient } = require('mongodb');
const url = "mongodb://127.0.0.1:27017/";


exports.dataSave = (req, res) => {
    const data = req.body

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sensor");
        var myobj = { temperatur: data.temperatur, humidity: data.humidity, time: new Date() };
        dbo.collection("sensorcollection").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("插入成功");
            db.close();
        });
    });

    res.send({
        status: 0,
        mesaage: "recevie the data"
    })





};

exports.getdatatemp = (req, res) => {



    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("sensor");
        dbo.collection("sensorcollection").find({}).sort({ _id: -1 }).limit(1).toArray(function(err, result) { // 返回集合中所有数据
            if (err) throw err;
            res.send({
                status: 0,
                mesaage: "send data",
                data: result
            })
            db.close();
        });
    });


};