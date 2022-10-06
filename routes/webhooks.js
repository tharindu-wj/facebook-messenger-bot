/**
 * Routes for Facebook Messenger webhook events
 */

 "use strict";

const express = require("express");
const {
  validateWebhook,
  handleEventNotifications,
} = require("../controllers/webhooks");
const router = express.Router();

router.route("/").get(validateWebhook).post(handleEventNotifications);

module.exports = router;
