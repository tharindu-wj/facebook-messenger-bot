/**
 * Messenger bot for online shopping facebook pages
 */

"use strict";

const express = require("express");
const dotenv = require("dotenv");
const bunyan = require("bunyan");

dotenv.config();
const configs = require("./config/configs");

const log = bunyan.createLogger({
  name: "facebook messenger bot",
  level: configs.logLevel,
});

const connectDB = require("./config/db");

const verifyMessengerSignature = require("./middlewares/verifyMessengerSignature");

const webhookRoutes = require("./routes/webhooks");

// Connect to database
connectDB(log);

const app = express();

// add app logger to request object. so it can be used in other middleware
app.use((req, res, next) => {
  req.log = log;
  next();
});

// Parse application/json. Verify that callback came from Facebook
app.use(express.json({ verify: verifyMessengerSignature }));

app.use("/webhook", webhookRoutes);

const PORT = configs.port || 5000;
app.listen(PORT, log.info(`Server running on port ${PORT}`));
