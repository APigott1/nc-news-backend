const handleMissingEndpointError = (req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
};

const handleDatabaseErrors = (err, req, res, next) => {
  switch (err.code) {
    case "22P02":
      res.status(400).send({ msg: "Invalid input" });
      break;
    case "23503":
      res.status(404).send({ msg: "Resource Not Found" });
      break;
    default:
      next(err);
  }
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

module.exports = {
  handleMissingEndpointError,
  handleDatabaseErrors,
  handleCustomErrors,
  handleServerErrors,
};
