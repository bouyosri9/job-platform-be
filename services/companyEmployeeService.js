const CompanyEmployee = require("../models/CompanyEmployee");

const createCompanyEmployee = async (userId, companyId) => {
  return await CompanyEmployee.create({ userId, companyId });
};

module.exports = {
  createCompanyEmployee,
};
