const express = require("express");
const { initiateStkPush, stkPushCallback } = require("../controllers/initiateStkPush");

const router = express.Router();

router.post("/initiateStkPush", initiateStkPush)
router.post("/stkPushCallback/:orderID", stkPushCallback )

module.exports = { router };
