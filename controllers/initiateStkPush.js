const { generateAccessToken } = require("../middlewares/generateAccess");
const { getTimeStamp } = require("../utils/generateTimestamp");
const createError = require("http-errors");
const axios = require("axios");

const initiateStkPush = async (req, res, next) => {
  const { amount, phone, orderID } = req.body;
  if (!amount || !phone || !orderID) {
    const error = createError.BadRequest("all fields are requred ");
    throw error;
  }
  const timeStamp = getTimeStamp();
  const accessToken = await generateAccessToken();
  const password = Buffer.from(
    process.env.shortCode + process.env.passKey + timeStamp
  ).toString("base64");
  const shortCode = process.env.shortCode;
  const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
  try {
    const response = await axios.post(
      url,
      {
        BusinessShortCode: shortCode,
        Password: password,
        Timestamp: timeStamp,
        TransactionType: "CustomerBuyGoodsOnline",
        Amount: amount,
        PartyA: phone,
        PartyB: shortCode,
        PhoneNumber: phone,
        CallBackURL: `${process.env.CallBackURL}/stkPushCallback/${orderID}`,
        AccountReference: "Kariuki Antony mini-business",
        TransactionDesc: "Paid online",
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    // const decodedObject = JSON.stringify(response.data)
    const {
      MerchantRequestID,
      CheckoutRequestID,
      ResponseCode,
      ResponseDescription,
      CustomerMessage,
    } = response.data;
    res.status(200).json({ ResponseDescription });
  } catch (error) {
    next(error);
  }
};

const stkPushCallback = async (req, res, next) => {
  console.log("The endpoint has been hit");
  try {
    const { orderID } = req.params;
    console.log(req.body);
    // const {MerchantRequestID,  CheckoutRequestID, ResultCode,  ResultDesc} = req.body.Body.stkCallback
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { initiateStkPush, stkPushCallback };
