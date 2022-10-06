/**
 * Controller methods for Facebook Messenger webhook events
 */

"use strict";

const configs = require("../config/configs");
const GraphApi = require("../services/GraphApi");
const generateMessageResponse = require("../utils/generateMessageResponse");

const graphApiInstance = new GraphApi({
  pageAccessToken: configs.facebook.pageAccessToken,
});

exports.validateWebhook = async (req, res, next) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // Check the mode and token sent is correct
  if (mode === "subscribe" && token === configs.facebook.callbackToken) {
    // Respond with the challenge token from the request
    req.log.info("Webhook verified");
    res.status(200).send(challenge);
  } else {
    // Respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
};

exports.handleEventNotifications = async (req, res, next) => {
  const body = req.body;

  req.log.debug("Received webhook:");
  req.log.debug(body);

  if (body.object === "page") {
    // Returns a '200 OK' response to all requests
    res.status(200).send("EVENT_RECEIVED");

    // handled messages synchronously to maintain responses aligned with incoming message sequence
    for (const entry of body.entry) {
      const pageId = entry.id;
      for (const { sender, message } of entry.messaging) {
        const responseMessage = await generateMessageResponse(message);
        req.log.debug(`Response: ${responseMessage}`);
        await graphApiInstance.sendCustomerMessage(
          pageId,
          sender.id,
          responseMessage
        );
      }
    }
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};
