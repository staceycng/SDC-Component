const mongoose = require('mongoose');
const URI = 'mongodb://localhost/bestbuy';
const pg = require('pg');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/bestbuy";
let _db;
  
var username = process.env.USERNAME;
var pgpass = process.env.PGPASS;
var server = process.env.SERVER;
  var connectionString = `postgres://${username}:${pgpass}@${server}/postgres`;

  // var connectToServer = (callback) => {
  //   MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //     if(err){
  //       callback(err);
  //     }
  //     else{
  //       _db = client.db('bestbuy');
  //       callback(null, _db);
  //     }
  //   });
  // }


var pgClient = new pg.Client(connectionString);
pgClient.connect()
.then(() => {
  console.log('Postgres connected!');
})
.catch((err) => {
  console.log(err);
})
module.exports = {
    pgClient: pgClient,
    // connectToServer: connectToServer
}

// mongoose.connect(URI, {useNewUrlParser: true});

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   console.log('Mongoose BB connected');
// });
