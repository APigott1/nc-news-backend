const { selectUsers } = require("../models/users.js");

const getUsers = async (req, res) => {
  const rows = await selectUsers();
  res.status(200).send({ users: rows });
};

module.exports = { getUsers };
