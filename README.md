url shortener backend setup instructions

folder name: backend test submission

prerequisites: install node.js and mongodb

steps to run:

open terminal
cd "backend test submission"

install dependencies:
npm install

start mongodb:
mongod

start server:
node server.js

server runs at: http://localhost:5000

api endpoints:

create short url:
post http://localhost:5000/shorturls
body: { "url": "https://www.google.com", "validity": 60 }

use short url:
open http://localhost:5000/<shortcode>

get url info:
get http://localhost:5000/shorturls/<shortcode>








