const Admin = require("../models/Admin");

const createAdmin = async (userId) => {
  return await Admin.create({ userId });
};

module.exports = {
  createAdmin,
};
