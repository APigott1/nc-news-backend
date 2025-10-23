const { selectUsers } = require("../models/users.js");

const getUsers = async (req, res) => {
  const usersData = await selectUsers();
  res.status(200).send({ users: usersData });
};

module.exports = { getUsers };
