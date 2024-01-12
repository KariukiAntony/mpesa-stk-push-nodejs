const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const createError = require("http-errors");
const { router } = require("./routes/paymentRoute");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(cors());

//register  the routes
app.use("/api/v1", router);

// handle errors
app.use(async (req, res, next) => {
  const error = createError.NotFound(`The endpoint ${req.path} does not exist`);
  next(error);
});

app.use(async (error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    error: {
      status: status,
      message: error.message,
    },
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app is running on http://localhost:${port}`);
});
