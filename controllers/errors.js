const handleMissingEndpointError = (req, res) => {
  res.status(404).send({ msg: "Path Not Found" });
};

const handleDatabaseErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Invalid input" });
  }
};

module.exports = { handleMissingEndpointError, handleDatabaseErrors };
