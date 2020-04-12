var db = require('../../db-mongodb/index.js');
var readline = require('readline');
var fs = require('fs');
var fileName = '/Users/Stacey/Product-display-Component/Product-Display/server/utils/pgdata.txt';

// var dbseed = [];

// var rd = readline.createInterface({
//     input: fs.createReadStream(fileName),
//     output: process.stdout,
//     console: false
// });

// rd.on('line', function(line) {
//     dbseed.push(line)

//     if(dbseed.length === threshold){
//         seed();
//         dbseed = [];
//     }
// });

var originalLength = 10000000;


async function seed(){
    var start = new Date();
    var hrstart = process.hrtime();

    db.query(
                "COPY games(name, category, sub_category, model, publisher, sku, product_sku, release_date, esrb_rating, price, images, compatible_platforms, software_format, geek_squad_price, included, header_titles, still_img_videos, miniplayer_videos, video_length, reviews_count, reviews_breakdown, questions) FROM '/Users/Stacey/Product-display-Component/Product-Display/server/utils/games.txt' USING DELIMITERS '\t' WITH NULL AS 'null';"
            )
    .then(() => {
        var end = new Date() - start;
        var hrend = process.hrtime(hrstart);
        console.log('Number of documents seeded: ' + originalLength);
        console.log('Execution time: %dms', end)
        console.log('Execution time per document: %dms', end/originalLength);
        console.log('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000)
        return;
    })
    .catch((err) => {
        console.log(err);
    })
}

seed();





