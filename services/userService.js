const User = require("../models/user");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getUserById = async (userId) => {
  return await User.findById(userId).select("-password");
};

module.exports = {
  createUser,
  getUserById,
};
