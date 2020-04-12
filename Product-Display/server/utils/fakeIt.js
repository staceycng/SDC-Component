const faker = require('faker');
const helpers = require('./ps4helpers');
const vids = require('./vidhelpers');
const reviews = require('./reviewhelpers');
const images = require('./Imagehelpers');
const fs = require('fs');

var gameArray = [];
var sku = 12;
var stream = fs.createWriteStream('games.json');
var entries = 10000000;

var fields = "name,category,sub_category,model,publisher,sku,product_sku,release_date,esrb_rating,price,images,compatible_platforms,software_format,geek_squad_price,included,header_titles,still_img_videos,miniplayer_videos,video_length,reviews_count,reviews_breakdown,questions" + "\n";
var photos = ['https://source.unsplash.com/featured/electronics/550x550', 'https://source.unsplash.com/featured/electronics/550x550', 'https://source.unsplash.com/featured/electronics/550x550', 'https://source.unsplash.com/featured/electronics/550x550', 'https://source.unsplash.com/featured/electronics/550x550', 'https://source.unsplash.com/featured/electronics/550x550'];

try{
  fs.appendFileSync('games.csv', fields);
} catch(err){
  console.log(err);
}

for (let i = 0; i < entries; i++) {
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
  "\"" + `[${photos}]` + "\"",
  "\"" + `[${helpers.platforms}]` + "\"",
  "\"" + `[${helpers.format}]` + "\"",
  helpers.geekPriceGenerator(productprice),
  helpers.titles[index],
  helpers.ps4header,
  "\"" + `[{${hasVideo ? vids.generateVidGallery() : []}]` +  "\"",
  hasVideo ? vids.ps4Vids[vidIndex]: '',
  [vids.ps4VidTimeStamps[vidIndex]],
  reviews.reviewcount[index],
  "\"" + `[${reviews.reviewbreakdown[index]}]` + "\"",
  reviews.questionCount[vidIndex]];
    
  var line = columns.join(',') + '\n';
  try{
    fs.appendFileSync('games.csv', line);
  } catch(err){
      console.log(err);
  }

  sku++;
}




  // fs.writeFile(__dirname + '/ps4seed1.json', JSON.stringify(gameArray), function (err) {
  //   if (err) 
  //   return console.log(err);
  //   console.log('success');
  // });

  
   
