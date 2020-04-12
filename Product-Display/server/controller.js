// const Product = require('../db-mongodb/model');
// var database = require('../db-mongodb/index.js');
// var Promise = require('bluebird');
// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
// var Collection = mongodb.Collection;
// let exec = require('child_process').exec;

// Promise.promisifyAll(mongodb);
// Promise.promisifyAll(MongoClient);
// Promise.promisifyAll(Collection);

// // Postgres Controllers
// module.exports = {
//   getAll(req, res) {
//     console.log('in the controller for port 3002');
//     var start = new Date();
//     var hrstart = process.hrtime();
//     database.query("SELECT * FROM games")
//       .then((product) => {
//         res.status(200).send(product);
//       })
//       .then(() => {
//         var end = new Date() - start;
//         var hrend = process.hrtime(hrstart);
//         console.log("Successfully queried!");
//         console.log('Execution time: %dms', end)
//         console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
//       })
//       .catch((err) => {
//         res.status(400).send(err);
//       })
//   },

//   getOne(req, res) {
//     // console.log('in getOne', req.params);
//     let sku = req.params.sku;
//     // var start = new Date();
//     // var hrstart = process.hrtime();
//     database.query(`SELECT * FROM games WHERE sku=${sku} LIMIT 1`)
//       .then((product) => {
//         res.status(200).json(product);
//       })
//       // .then(() => {
//       //   var end = new Date() - start;
//       //   var hrend = process.hrtime(hrstart);
//       //   console.log('Execution time: %dms', end)
//       //   console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
//       // })
//       .catch((err) => {
//         res.status(400).send(err);
//       })
//   },

//   getName(req, res) {
//     console.log('in getName', req.params);
//     let name = req.params.name;
//     var start = new Date();
//     var hrstart = process.hrtime();
//     database.query(`SELECT * FROM games WHERE name=${name} LIMIT 1`)
//       .then(product => {
//         res.status(200).send(product);
//       })
//       .then(() => {
//         var end = new Date() - start;
//         var hrend = process.hrtime(hrstart);
//         console.log("Successfully queried!");
//         console.log('Execution time: %dms', end)
//         console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
//       })
//       .catch(err => {
//         res.status(400).send(`product name:${name} not found`, err);
//       })
//   }
// }


// // MongoDB Controllers
// // database.connectToServer(function(err, client){
// //   if(err){
// //     console.log(err);
// //   }
// //   else{
// //     db = client;
// //     console.log('Mongo connected!');
// //   }
// // })

// // var db;

// // module.exports = {
// // getAll(req, res) {
// //   console.log('in the controller for port 3002');
// //   database.connectToServer(function(err, client){
// //     if(err){
// //       console.log(err);
// //     }
// //     else{
// //       db = client;
// //       console.log('Mongo connected!');
// //       var start = new Date();
// //       var hrstart = process.hrtime();

// //       db['mongo-products'].find()
// //         .then((product) => {
// //           res.status(200).json(product);
// //         })
// //         .then(() => {
// //           var end = new Date() - start;
// //           var hrend = process.hrtime(hrstart);
// //           console.log("Successfully queried!");
// //           console.log('Execution time: %dms', end)
// //           console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
// //         })
// //         .catch((err) => {
// //           res.status(400).send(err);
// //         })
// //     }
// //   })
// // },

// // getOne(req, res) {
// //   console.log('in getOne', req.params);
// //   let sku = Number(req.params.sku);

// //   var start = new Date();
// //   var hrstart = process.hrtime();
// //   db.collection('mongo-products').findOne({ sku })
// //     .then((product) => {
// //       console.log('Got result!');
// //       res.status(200).json(product);
// //     })
// //     .then(() => {
// //       var end = new Date() - start;
// //       var hrend = process.hrtime(hrstart);
// //       console.log("Successfully queried!");
// //       console.log('Execution time: %dms', end)
// //       console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
// //     })
// //     .catch((err) => {
// //       res.status(400).send(err);
// //     })
  

// // },

// // getName(req, res) {
// //   console.log('in getName', req.params);
// //   let name = req.params.name;

// //   database.connectToServer(function(err, client){
// //     if(err){
// //       console.log(err);
// //     }
// //     else{
// //       db = client;
// //       console.log('Mongo connected!');
// //       var start = new Date();
// //       var hrstart = process.hrtime();

// //       db['mongo-products'].findOne({ name })
// //         .then((product) => {
// //           res.status(200).json(product);
// //         })
// //         .then(() => {
// //           var end = new Date() - start;
// //           var hrend = process.hrtime(hrstart);
// //           console.log("Successfully queried!");
// //           console.log('Execution time: %dms', end)
// //           console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
// //         })
// //         .catch((err) => {
// //           res.status(400).send(err);
// //         })
// //     }
// //   })
// // }
// // }

// // module.exports = {
// //   getAll(req, res) {
// //     console.log('in the controller for port 3002');
// //     Product.find({})
// //       .then(product => {
// //         res.json(product);
// //       })
// //       .catch(err => {
// //         res.status(400).send('product not found', err);
// //       })
// //   },

// //   getOne(req, res) {
// //     console.log('in getOne', req.params);
// //     let sku = req.params.sku;
// //     Product.findOne({ sku })
// //       .then(product => {
// //         res.json(product);
// //       })
// //       .catch(err => {
// //         res.status(400).send(`product sku:${sku} not found`, err);
// //       })
// //   },

// //   getName(req, res) {
// //     console.log('in getName', req.params);
// //     let name = req.params.name;
// //     Product.findOne({ name })
// //       .then(product => {
// //         res.json(product);
// //       })
// //       .catch(err => {
// //         res.status(400).send(`product name:${name} not found`, err);
// //       })
// //   }
// // }