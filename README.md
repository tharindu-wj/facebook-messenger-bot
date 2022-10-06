# Facebook Messenger Bot

## Setup Facebook Messenger App

Follow this developer document [Documentation]https://developers.facebook.com/docs/messenger-platform/webhooks
Note: make sure to enable Built-in NLP for the page

## Setup App Locally

#### 1. Install the dependencies

Open a new terminal tab in this directory.

```bash
$ npm install
```

#### 2. Set up .env file

Copy the file `.sample.env` to `.env`

```bash
cp .sample.env .env
```

Edit the `.env` file to add all the values for your app and page.

#### 3. Import data to DB

Create a collection called `products` and data.products.json to it

```bash
cp .sample.env .env
```

Edit the `.env` file to add all the values for your app and page.

#### 3. Run your app locally

```bash
npm run dev
```

#### 4. Install tunneling service

If not already installed, install ngrok via [download](https://ngrok.com/download) or via command line:

```bash
npm install -g ngrok
```

In the directory of this repo, request a tunnel to your local server with your preferred port

```bash
ngrok http 5000
```

## TODOS
 * Proper error handling middleware
 * Include some customer details in the purchase order email
 * Unit tests
 * Improve logging