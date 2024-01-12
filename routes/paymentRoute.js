const express = require("express");
const { initiateStkPush } = require("../controllers/initiateStkPush");

const router = express.Router();

router.get("/initiateStkPush", initiateStkPush)

module.exports = { router };
