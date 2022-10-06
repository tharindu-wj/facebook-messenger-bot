/**
 * Connect to the MongoDB
 */

"use strict";

const configs = require("./configs");

const mongoose = require("mongoose");

const connectDB = async (log) => {
  const conn = await mongoose.connect(configs.db.mongoUrl, {
    useNewUrlParser: true,
  });
  log.debug(`MongoDB connected: ${conn.connection.host}`);
};

module.exports = connectDB;
