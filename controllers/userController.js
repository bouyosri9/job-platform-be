const userService = require("../services/userService");
const adminService = require("../services/adminService");
const companyEmployeeService = require("../services/companyEmployeeService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, companyId } = req.body;

    // Create user
    const user = await userService.createUser({ name, email, password, role });

    // Assign role based on user role
    if (role === "admin") {
      await adminService.createAdmin(user._id);
    } else if (role === "company") {
      await companyEmployeeService.createCompanyEmployee(user._id, companyId);
    }

    res.status(201).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
};
