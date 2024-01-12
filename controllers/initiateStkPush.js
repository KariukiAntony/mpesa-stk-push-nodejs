const { getTimeStamp } = require("../utils/generateTimestamp");

const initiateStkPush = async(req, res) => {
   const timestamp = getTimeStamp;
   res.status(200).json({message: "This is the initiate stk push route "});
}

module.exports = { initiateStkPush }