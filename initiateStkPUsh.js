const  getTimeStamp  = require("./generateTimestamp")
const  generateAccessToken = require("./generateAccess")
const axios  = require("axios")
require("dotenv").config()

async function  initiateStkPush(){
   const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
   const shortCode = process.env.shortCode
   const timeStamp = getTimeStamp()
   const password = Buffer.from(process.env.shortCode+process.env.passKey+timeStamp).toString("base64")
   const accessToken = await generateAccessToken()
   try {
      const response = await axios.post(
         url,
         {
            BusinessShortCode: shortCode,
            Password: password,
            Timestamp: timeStamp,
            TransactionType: "CustomerBuyGoodsOnline",
            Amount: 1,
            PartyA: process.env.PartyA,
            PartyB: shortCode,
            PhoneNumber: process.env.PartyA,
            CallBackURL: "https://2536-154-122-145-165.ngrok-free.app/callback_url",
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

      console.log(response.data); // Assuming response.data contains the server's response
   } catch (error) {
      console.error(error.message);
   }
}

initiateStkPush()
