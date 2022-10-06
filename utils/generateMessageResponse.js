/**
 * *
 * This module will generate responses for messages according to the text content
 */

"use strict";

const configs = require("../config/configs");
const Product = require("../models/Product");
const EmailClient = require("../services/EmailClient");
const helper = require("./helper");

const greetingResponses = [
  "How are you?",
  "I hope you are doing well.",
  "I hope you are having a great day.",
];
const queryPrefixes = ["/desc", "/price", "/shipping", "/buy"];

// get nlp data from message
function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

module.exports = async (message = {}) => {
  const greeting = firstTrait(message.nlp, "wit$greetings");
  const messageText = message.text;

  // handle greeting messages
  if (greeting && greeting.confidence > 0.8) {
    return greetingResponses[
      helper.generateRandomInteger(0, greetingResponses.length - 1)
    ];
  }
  // handle query messages
  else if (
    queryPrefixes.find((item) =>
      helper.normalizeString(messageText).includes(item)
    )
  ) {
    const fieldMapping = {
      "/desc": "description",
      "/price": "price",
      "/shipping": "shipping",
    };
    const [field, productId] = messageText.split(" ");
    const product = await Product.findOne({ sku: parseInt(productId) });
    if (!product) {
      return `Product does not exists for ${productId}. Please check the product id again`;
    }
    if (field === "/buy") {
      // send email to page owner when customer wants to buy a product
      const emailClientInstance = new EmailClient({
        token: configs.mailClient.token,
      });
      // TODO:: Add customer details to email body
      await emailClientInstance.send({
        toEmail: configs.shop.email,
        toName: configs.shop.name,
        fromEmail: configs.app.email,
        fromName: configs.app.name,
        subject: "Purchase Order",
        emailBody: `<h3>Product Name: ${product.name}</h3><p>${product.description}</p><p>Price: ${product.price}</p><p>Shipping fee: ${product.shipping}</p>`,
      });
      return `Purchase request sent for ${product.name}`;
    } else {
      // return details for requested field
      return product[fieldMapping[field]];
    }
  }

  return "How can i help you?";
};
