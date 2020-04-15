"COPY games(name, category, sub_category, model, publisher, sku, product_sku, release_date, esrb_rating, price, geek_squad_price, included, header_titles, miniplayer_videos, video_length, reviews_count, reviews_breakdown, questions) FROM '/Users/Stacey/Product-display-Component/Product-Display/server/utils/games2.txt' USING DELIMITERS '\t' WITH NULL AS 'null';"

import { text } from "body-parser";


CREATE TABLE games(
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


CREATE TABLE account(
    user_id serial PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    password VARCHAR (50) NOT NULL,
    email VARCHAR (355) UNIQUE NOT NULL,
    created_on TIMESTAMP NOT NULL,
    last_login TIMESTAMP
 );