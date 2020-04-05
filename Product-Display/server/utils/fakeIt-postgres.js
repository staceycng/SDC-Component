const faker = require('faker');
const helpers = require('./ps4helpers');
const vids = require('./vidhelpers');
const reviews = require('./reviewhelpers');
const fs = require('fs');
const path = require('path');

// Open write stream
var stream = fs.createWriteStream('pgdata.txt');
var entries = 1000000;
var sku = 12;
var gamesArr = [];

// Handle stream error
stream.on('error', function (err) {
    console.log(err);
});

// Loop through entry creation
for(var i = 0; i < entries; i++){
    var index = Math.floor(Math.random() * 10);
    let productprice = helpers.randomSelector(helpers.prices);
    let vidIndex = helpers.randomIndexSelector(vids.ps4VidTimeStamps);
    let hasVideo = faker.random.boolean();
    let rating = helpers.randomSelector(helpers.esrbRating);

    var columns = [ helpers.titles[index],
    helpers.category,
    helpers.subcategory,
    faker.lorem.word().toUpperCase() + faker.random.number(),
    faker.company.companyName(),
    helpers.incrementer(sku),
    faker.finance.account(),
    helpers.dateGenerator(),
    rating,
    productprice,
    '{"https://source.unsplash.com/featured/electronics/550x550", "https://source.unsplash.com/featured/electronics/550x550", "https://source.unsplash.com/featured/electronics/550x550", "https://source.unsplash.com/featured/electronics/550x550", "https://source.unsplash.com/featured/electronics/550x550", "https://source.unsplash.com/featured/electronics/550x550"}',
    helpers.platforms,
    helpers.format,
    helpers.geekPriceGenerator(productprice),
    helpers.titles[index],
    helpers.ps4header,
    `{${hasVideo ? vids.generateVidGallery() : []}}`,
    hasVideo ? vids.ps4Vids[vidIndex]: "",
    [vids.ps4VidTimeStamps[vidIndex]],
    reviews.reviewcount[index],
    `{${reviews.reviewbreakdown[index]}}`,
    reviews.questionCount[vidIndex]];

    var line = columns.join('\t') + '\n';
    stream.write(line);
    gamesArr.push(line);
}

module.exports = gamesArr;
  
   
