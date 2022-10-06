/**
 * Library for Facebook Graph API
 */

"use strict";

const axios = require("axios");

class GraphApi {
  constructor(config) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: "https://graph.facebook.com",
      timeout: 30000,
      headers: {},
    });
    this.version = "v14.0";
  }
  async sendCustomerMessage(pageId, customerId, message) {
    try {
      const response = await this.axiosInstance.post(
        `/${this.version}/${pageId}/messages?recipient={id:${customerId}}&message={text:'${message}'}&messaging_type=RESPONSE&access_token=${this.config.pageAccessToken}`
      );
      return response.data;
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = GraphApi;
