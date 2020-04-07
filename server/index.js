const express = require("express");
const cors = require("cors");
const scraper = require("google-play-scraper");
const mongoose = require("mongoose");
const keys = require("./config/keys");
require("./models/topApps");
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();

const topApps = mongoose.model("topApps");
app.use(cors());
app.use(express.json());

// scraper
//   .app({ appId: "com.supercell.brawlstars" })
//   .then(console.log, console.log);
app.get("/hey", async (req, res) => {
  try {
    res.json("hey");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/topapps", async (req, res, done) => {
  try {
    const list = await scraper.list({
      collection: scraper.collection.TOP_FREE
    });
    res.json(list);
    for (let index = 0; index < list.length; index++) {
      const details = await scraper.app({ appId: list[index].appId });
      topApps.findOne({ appId: details.appId }).then(existingApp => {
        if (existingApp) {
          //we already have a record with this ID
          done(null, existingApp);
        } else {
          new topApps({
            title: details.title,
            appId: details.appId,
            url: details.url,
            icon: details.icon,
            developer: details.developer,
            summary: details.summary,
            screenshots: details.screenshots,
            video: details.video,
            videoImage: details.videoImage,
            icon: details.icon,
            size: details.size,
            scoreText: details.scoreText,
            description: details.description
          })
            .save()
            .then(app => done(null, app));
        }
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/appdetails/:appId", async (req, res) => {
  try {
    const { appId } = req.params;
    const details = await topApps.findOne({ appId: appId });
    res.json(details);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/appdetails", async (req, res) => {
  try {
    const appId = req.query.pkg;
    const details = await topApps.findOne({ appId: appId });
    res.json(details);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/hey", async (req, res) => {
  try {
    res.json("hey");
  } catch (err) {
    console.error(err.message);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
