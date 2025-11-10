const cors = require("cors");
const express = require("express");
const {
  handleMissingEndpoint,
  handleDatabaseErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors.js");
const apiRouter = require("./routes/apiRouter.js");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleMissingEndpoint);

app.use(handleDatabaseErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
