/**
 * Library class for SendGrid emailing API
 */

"use strict";

const axios = require("axios");

class EmailClient {
  constructor(config) {
    this.config = config;
    this.axiosInstance = axios.create({
      baseURL: "https://api.sendgrid.com",
      timeout: 30000,
      headers: { Authorization: `Bearer ${config.token}` },
    });
    this.version = "v3";
  }
  async send({ toEmail, toName, fromEmail, fromName, subject, emailBody }) {
    try {
      const response = await this.axiosInstance.post(
        `/${this.version}/mail/send`,
        {
          personalizations: [
            {
              to: [
                {
                  email: toEmail,
                  name: toName,
                },
              ],
              subject,
            },
          ],
          content: [
            {
              type: "text/html",
              value: emailBody,
            },
          ],
          from: {
            email: fromEmail,
            name: fromName,
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err.message);
    }
  }
}

module.exports = EmailClient;
