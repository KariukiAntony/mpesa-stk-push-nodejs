// In this module we are going to generate an access token
// Which will be used to call other endpoints

const axios = require("axios");
require("dotenv").config();

let url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

async function generateAccessToken() {
  const consumerKey = process.env.consumer_key; // replace this with your consumer key
  const consumerSecret = process.env.consumer_secret; //replace this with your consumer secret
  const base64String = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${base64String}`,
        "Content-Type": "application/json",
      },
    });

    const token = await response.data.access_token;
    console.log(token);
    return token;
  } catch (error) {
    console.log(`An error has occured ${error.message}`);
  }
}

module.exports = { generateAccessToken };
