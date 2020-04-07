const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const topApps = new Schema({
  title: String,
  appId: String,
  url: String,
  icon: String,
  developer: String,
  summary: String,
  screenshots: Array,
  video: String,
  videoImage: String,
  icon: String,
  size: String,
  scoreText: String,
  description: String
});

mongoose.model("topApps", topApps);
