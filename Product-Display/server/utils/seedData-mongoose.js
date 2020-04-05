const db = require('../../db-mongodb/index.js');
const Product = require('../../db-mongodb/model');
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');
var path = require("path");
const file = path.resolve(__dirname, "data.txt");
const arrGames = require('./fakeIt.js');

var dbseed = arrGames;
var originalLength = dbseed.length;
var threshold = 1000;

async function seed(){
  var start = new Date();
  var hrstart = process.hrtime();

  var batch = dbseed.splice(0, threshold);

  async function insertBatch(batch){
    // If data is empty, return
    if(batch.length <= 0){
      var end = new Date() - start;
      hrend = process.hrtime(hrstart);
      console.log('Number of documents seeded: ' + originalLength);
      console.log('Threshold: ', threshold);
      console.log('Execution time: %dms', end)
      console.log('Execution time per document: %dms', end/originalLength);
      console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
      return;
    }
    // Insert batch into database
    Product.insertMany(batch)
    .then(() => {
      var newBatch = [];
      if(dbseed.length < threshold){
        newBatch = dbseed.splice(0);
        return insertBatch(newBatch);
      }
      else if(dbseed.length >= threshold){
        newBatch = dbseed.splice(0, threshold);
        return insertBatch(newBatch);
      }
      else{
        return;
      }
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  insertBatch(batch);
}


// fs.readFile(file, (err, data) => {
//   if(err){
//     throw err;
//     return;
//   }
  
//   console.log('Successfully read file!');
//   var seedData = data.toString().split("\n");
//   seedData.forEach((seed) => {
//     dbseed.push(JSON.parse(seed));
//   })
//   seed();
// })

seed();

