const { generateAccessToken } = require("../middlewares/generateAccess");
const { getTimeStamp } = require("../utils/generateTimestamp");
const createError = require("http-errors");
const axios  = require("axios")

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
    await axios.post(
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
         //  "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
   //  console.log(`stkPush response: ${response}`);
    res.status(200).json({"message": "Hello world"});
  } catch (error) {
    console.log(error.message);
    next(error);
  }

  res.status(200).json({ message: "This is the initiate stk push route " });
};

const stkPushCallback = async (req, res, next) => {
  try {
    const { orderID } = req.params;
    const reqBody = req.body;
    console.log(reqBody);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = { initiateStkPush, stkPushCallback };
