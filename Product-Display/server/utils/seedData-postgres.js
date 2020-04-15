var {pgClient} = require('../../db-mongodb/index.js');
var readline = require('readline');
var fs = require('fs');
var fileName = '/Users/Stacey/Product-display-Component/Product-Display/server/utils/pgdata.txt';

// Column        |   Type    | Collation | Nullable |              Default
// ----------------------+-----------+-----------+----------+-----------------------------------
//  id                   | integer   |           | not null | nextval('games_id_seq'::regclass)
//  name                 | text      |           |          |
//  category             | text      |           |          |
//  sub_category         | text      |           |          |
//  model                | text      |           |          |
//  publisher            | text      |           |          |
//  sku                  | integer   |           |          |
//  product_sku          | integer   |           |          |
//  release_date         | text      |           |          |
//  esrb_rating          | text      |           |          |
//  price                | money     |           |          |
//  images               | text[]    |           |          |
//  compatible_platforms | text[]    |           |          |
//  software_format      | text[]    |           |          |
//  geek_squad_price     | money     |           |          |
//  included             | text      |           |          |
//  header_titles        | text      |           |          |
//  still_img_videos     | text[]    |           |          |
//  miniplayer_videos    | text      |           |          |
//  video_length         | text      |           |          |
// video_length         | text      |           |          |
// reviews_count        | integer   |           |          |
// reviews_breakdown    | integer[] |           |          |
// questions            | integer   |           |          |

/*CREATE TABLE games (
    id serial,
    name text,
    category text,
    sub_category text,
    model text,
    publisher text,
    sku integer,
    product_sku integer,
    release_date text,
    esrb_rating text,
    price money,
    images text[],
    compatible_platforms text[],
    software_format text[],
    geek_squad_price money,
    included text,
    header_titles text,
    still_img_videos text[],
    miniplayer_videos text,
    video_length text,
    reviews_count integer,
    reviews_breakdown integer[],
    questions integer
    );
    */

var originalLength = 10000000;


async function seed(){
    var start = new Date();
    var hrstart = process.hrtime();

    pgClient.query(
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





