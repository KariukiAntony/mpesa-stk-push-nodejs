const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { router } = require("./routes/paymentRoute");
require("dotenv").config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors())

//register  the routes
app.use("/api/v1", router)


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
