const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/ShortUrl");
const log = require("../LoggingMiddleware/loggingMiddleware");
const app = express();
const geoip = require("geoip-lite");
const cors = require("cors");

mongoose.connect("mongodb://localhost:27017/urlshortener");

app.use(cors());
app.use(express.json());

app.post("/shorturls", async (req, res) => {
  try {
    const { url, validity, shortcode } = req.body;
    const urlPattern = /^(https?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!$&'()*+,;=.]+$/i;
    if (!url || !urlPattern.test(url)) {
      return res.status(400).json({ error: "Invalid URL. Please provide a valid HTTP or HTTPS URL." });
    }
    const expiryDate = new Date(Date.now() + validity * 60000);
    const code = shortcode || Math.random().toString(36).substring(2, 8);
    const newUrl = new ShortUrl({
      shortcode: code,
      originalUrl: url,
      expiry: expiryDate,
    });
    await newUrl.save();
    log(
      "backend",
      "info",
      "url-service",
      `A new short URL was created for ${url} with shortcode '${code}' and will expire at ${expiryDate.toISOString()}`
    );
    res.json({ shortcode: code, expiry: expiryDate });
  } catch (err) {
    log(
      "backend",
      "error",
      "url-service",
      `Failed to create short URL for '${req.body.url}'. Reason: ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
});


app.get("/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;
    const record = await ShortUrl.findOne({ shortcode });
    if (!record) return res.status(404).send("Shortcode not found");
    if (new Date() > record.expiry) return res.status(410).send("Link expired");
    record.clickCount++;
    record.clicks.push({
      timestamp: new Date(),
      referrer: req.get("Referrer") || "direct",
      geo: geoip.lookup(req.ip)?.country || "Unknown",
    });
    await record.save();
    log(
      "backend",
      "info",
      "url-service",
      `User was redirected using shortcode '${shortcode}' to ${record.originalUrl}`
    );
    res.redirect(record.originalUrl);
  } catch (err) {
    log(
      "backend",
      "error",
      "url-service",
      `Redirection failed for shortcode '${req.params.shortcode}'. Reason: ${err.message}`
    );
    res.status(500).send(err.message);
  }
});

app.get("/shorturls/:shortcode", async (req, res) => {
  try {
    const { shortcode } = req.params;
    const record = await ShortUrl.findOne({ shortcode });
    if (!record) return res.status(404).json({ error: "Shortcode not found" });
    res.json(record);
  } catch (err) {
    log(
      "backend",
      "error",
      "url-service",
      `Failed to fetch info for shortcode '${req.params.shortcode}'. Reason: ${err.message}`
    );
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
