const mongoose = require("mongoose");

const shortUrlSchema = new mongoose.Schema({
  shortcode: { type: String, unique: true, required: true },
  originalUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiry: { type: Date, required: true },
  clickCount: { type: Number, default: 0 },
  clicks: [
    {
      timestamp: Date,
      referrer: String,
      geo: String,
    },
  ],
});

module.exports = mongoose.model("ShortUrl", shortUrlSchema);
