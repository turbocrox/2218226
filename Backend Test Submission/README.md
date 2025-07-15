

URL Shortener Backend

Folder name: Backend Test Submission

1. Download Node.js and MongoDB.
2. Open terminal. Go to Backend Test Submission folder:
   cd "Backend Test Submission"
3. Install packages:
   npm install
4. Start MongoDB (in another terminal):
   mongod
5. Start server:
   node server.js
6. Server runs at: http://localhost:5000

To create short URL:
POST http://localhost:5000/shorturls
Body: { "url": "https://www.google.com", "validity": 60 }

To use short URL:
Open http://localhost:5000/<shortcode>

To get info:
GET http://localhost:5000/shorturls/<shortcode>
