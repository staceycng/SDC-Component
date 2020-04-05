var database = require('../../db-mongodb/index.js');
var Promise = require('bluebird');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Collection = mongodb.Collection;
const arrGames = require('./fakeIt.js');
var path = require('path');

Promise.promisifyAll(Collection.prototype);
Promise.promisifyAll(MongoClient);

var db;

database.connectToServer(function (err, client) {
    if (err) {
        console.log(err);
    }
    else {
        db = client;
        console.log('Mongo connected!');
        var dbseed = arrGames;
        var loops = 20;
        var originalLength = dbseed.length;
        var threshold = 84000;

        async function repeatSeed(){
            var start = new Date();
            var hrstart = process.hrtime();
            
            async function seed(index) {
                // var start = new Date();
                // var hrstart = process.hrtime();
                var dbseed = [...arrGames];
                
                var batch = dbseed.splice(0, threshold);
    
                async function insertBatch(batch) {
                    // If data is empty, return
                    if (batch.length <= 0) {
                        var end = new Date() - start;
                        var hrend = process.hrtime(hrstart);
                        console.log('Number of documents seeded: ' + (originalLength * loops));
                        console.log('Threshold: ', threshold);
                        console.log('Execution time: %dms', end)
                        console.log('Execution time per document: %dms', end / (originalLength + (originalLength * index)));
                        console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
                        return;
                    }
                    // Insert batch into database
                    db.collection('products-mongo').insertMany(batch)
                        .then(() => {
                            var newBatch = [];
                            console.log('Added batch!');
                            if (dbseed.length < threshold) {
                                newBatch = dbseed.splice(0);
                                return insertBatch(newBatch);
                            }
                            else if (dbseed.length >= threshold) {
                                newBatch = dbseed.splice(0, threshold);
                                return insertBatch(newBatch);
                            }
                            else {
                                return;
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        })
    
                }
    
                insertBatch(batch);
            }

            for(var i = 0; i < loops; i++){
                seed(i);
            }

            // var end = new Date() - start;
            // var hrend = process.hrtime(hrstart);
            // console.log('Number of documents seeded: ' + originalLength);
            // console.log('Threshold: ', threshold);
            // console.log('Execution time: %dms', end)
            // console.log('Execution time per document: %dms', end / originalLength);
            // console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
        }

        repeatSeed();
    }
})


