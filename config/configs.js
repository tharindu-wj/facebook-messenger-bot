/**
 * Configurations for the app
 */

"use strict";

module.exports = {
  port: process.env.PORT || 5000,
  logLevel: process.env.LOG_LEVEL || "info",
  app: { name: process.env.APP_NAME, email: process.env.APP_EMAIL },
  db: { mongoUrl: process.env.MONGO_URI },
  facebook: {
    callbackToken: process.env.FACEBOOK_CALLBACK_TOKEN,
    appSecret: process.env.FACEBOOK_APP_SECRET,
    pageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  },
  shop: {
    name: process.env.SHOP_NAME,
    email: process.env.SHOP_EMAIL,
  },
  mailClient: {
    token: process.env.SENDGRID_TOKEN,
  },
};
