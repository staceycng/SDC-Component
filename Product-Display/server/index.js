require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const router = require('./router');
var compression = require('compression')
var databases = require('../db-mongodb/index.js');
var pgdb = databases.pgClient;
var connectToServer = databases.connectToServer;
const port = 3002;

const app = express();
// PRODUCT DISPLAY
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression())
app.use(morgan('dev'));

app.listen(port, () => console.log('SERVING Express @ port ' + port));

var getter = (req, res) => {
  pgdb.query(`SELECT * FROM games WHERE sku=${req.params.sku} LIMIT 1`)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
};

// Production request - get by sku number
app.get('/product/sku/:sku', (req, res) => {
  pgdb.query(`SELECT * FROM games WHERE sku=${req.params.sku} LIMIT 1`)
    .then((product) => {
      res.status(200).send(product);
    })
    .catch((err) => {
      res.status(400).send(err);
    })
});


// Test - get by sku number
app.get('/test/sku/:sku', (req, res) => {
  console.log(`Query Sku: ${req.params.sku}`);
  pgdb.query(`EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS) SELECT * FROM games WHERE sku=${req.params.sku} LIMIT 1`)
    .then((result) => {
      console.log(`Postgres Total Time: ${result.rows[0]['QUERY PLAN'][0]['Planning Time'] + result.rows[0]['QUERY PLAN'][0]['Execution Time']}ms`);
    })

  var db;
  connectToServer(function (err, client) {
    if (err) {
      console.log(err);
    }
    else {
      db = client;
    }

    db.collection('mongo-products').find({ sku: Number(req.params.sku) }).limit(1).explain('executionStats')
      .then((result) => {
        console.log('MongoDB Total Time: ' + result.executionStats.executionTimeMillis + 'ms');
        res.status(200).send();
      })

  })
});

// Test - get by sku number
app.get('/test/sku/:sku', (req, res) => {
  console.log(`Query Sku: ${req.params.sku}`);
  pgdb.query(`EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS) SELECT * FROM games WHERE sku=${req.params.sku} LIMIT 1`)
    .then((result) => {
      console.log(`Postgres Total Time: ${result.rows[0]['QUERY PLAN'][0]['Planning Time'] + result.rows[0]['QUERY PLAN'][0]['Execution Time']}ms`);
    })

  var db;
  connectToServer(function (err, client) {
    if (err) {
      console.log(err);
    }
    else {
      db = client;
    }

    db.collection('mongo-products').find({ sku: Number(req.params.sku) }).limit(1).explain('executionStats')
      .then((result) => {
        console.log('MongoDB Total Time: ' + result.executionStats.executionTimeMillis + 'ms');
        res.status(200).send();
      })

  })
});

// Test - get by rating 
// app.get('/test/rating', (req, res) => {
//   var limit = 1;
//   const esrbRating = ["E (Everyone)", "M (Mature 17+)", "T (Teen 13+)", "E10+ (Everyone 10+)" ]
//   var rating = esrbRating[(Math.floor(Math.random() * 4))];
//   console.log(`Query Sku: ${rating} Rating, Limit: ${limit}`);
//   pgdb.query(`EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS) SELECT * FROM games WHERE esrb_rating='${rating}' LIMIT ${limit}`)
//     .then((result) => {
//       console.log(`Postgres Total Time: ${result.rows[0]['QUERY PLAN'][0]['Planning Time'] + result.rows[0]['QUERY PLAN'][0]['Execution Time']}ms`);
//     })

//   var db;
//   connectToServer(function (err, client) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       db = client;
//     }

//     db.collection('mongo-products').find({ esrb_rating: `${rating}` }).limit(limit).explain('executionStats')
//       .then((result) => {
//         console.log('MongoDB Total Time: ' + result.executionStats.executionTimeMillis + 'ms');
//         res.status(200).send();
//       })

//   })
// });

// // Test - get by price
// app.get('/test/price', (req, res) => {
//   var limit = 1000000;
//   var lower = 19.99;
//   var range = 59.99 - lower;
//   var price = Math.floor(Math.random() * range) + lower;
//   console.log(`Query Sku By Price >= ${price}, Limit: ${limit}`);
//   pgdb.query(`EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS) SELECT * FROM games WHERE price>=cast(${price} as money) LIMIT ${limit}`)
//     .then((result) => {
//       console.log(`Postgres Total Time: ${result.rows[0]['QUERY PLAN'][0]['Planning Time'] + result.rows[0]['QUERY PLAN'][0]['Execution Time']}ms`);
//     })

//   var db;
//   connectToServer(function (err, client) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       db = client;
//     }

//     db.collection('mongo-products').find({ price: {$gt: price}}).limit(limit).explain('executionStats')
//       .then((result) => {
//         console.log('MongoDB Total Time: ' + result.executionStats.executionTimeMillis + 'ms');
//         res.status(200).send();
//       })

//   })
// });

// // Test - get by publisher name and game name
// app.get('/test/pub-game', (req, res) => {
//   var limit = 1000000;
//   var publishers = ['Raynor', 'Gislason Group', 'Feest', 'Thiel', 'Jacobi LLC'];
//   var games = ["Cyberpunk 2077 Standard Edition", "The Last of Us Part II Special Edition", "Death Stranding Standard Edition", "Star Wars: Jedi Fallen Order", "Call of Duty: Modern Warfare Standard Edition", "NBA 2K20 Standard Edition", "Madden NFL 20 Standard Edition", "MLB The Show 20 Standard Edition", "NHL 20 Standard Edition","Grand Theft Auto V: Premium Edition"];
//   var publisher = publishers[Math.floor(Math.random() * 5)];
//   var game = games[Math.floor(Math.random() * 10)];
//   console.log(`Query Sku By Publisher: ${publisher}, Game: ${game}, Limit: ${limit}`);
//   pgdb.query(`EXPLAIN (FORMAT JSON, ANALYZE, BUFFERS) SELECT * FROM games WHERE publisher='${publisher}' AND name='${game}' LIMIT ${limit}`)
//     .then((result) => {
//       console.log(`Postgres Total Time: ${result.rows[0]['QUERY PLAN'][0]['Planning Time'] + result.rows[0]['QUERY PLAN'][0]['Execution Time']}ms`);
//     })
//     .catch((err) => {
//       console.log(err);
//     })

//   var db;
//   connectToServer(function (err, client) {
//     if (err) {
//       console.log(err);
//     }
//     else {
//       db = client;
//     }

//     db.collection('mongo-products').find({ $and: [{ publisher: publisher }, { name: game }] }).limit(limit).explain('executionStats')
//       .then((result) => {
//         console.log('MongoDB Total Time: ' + result.executionStats.executionTimeMillis + 'ms');
//         res.status(200).send();
//       })
//       .catch((err) => {
//         console.log(err);
//       })

//   })
// });


