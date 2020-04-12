var database = require('../../db-mongodb/index.js');
var Promise = require('bluebird');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;


var db;
var originalLength = 10000000

database.connectToServer(function (err, client) {
    if (err) {
        console.log(err);
    }
    else {
        db = client;
        console.log('Mongo connected!');
        var start = new Date();
        var hrstart = process.hrtime();

        let exec = require('child_process').exec;
        var command = "mongoimport --db bestbuy --collection mongo-products --type csv --file /Users/Stacey/Product-display-Component/Product-Display/server/utils/games.csv --headerline"
        exec(command, (err, stdout, stderr) => {
            if(err){
                console.log(err);
            }
            else{
                var end = new Date() - start;
                var hrend = process.hrtime(hrstart);
                console.log("Successfully imported into MongoDB!");
                console.log('Number of documents seeded: ' + originalLength);
                console.log('Execution time: %dms', end)
                console.log('Execution time per document: %dms', end/originalLength);
                console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
                db['mongo-products'].createIndex({ sku: 1 });
            }
          })
    }
})


