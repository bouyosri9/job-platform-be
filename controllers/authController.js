const User = require("../models/user");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if any of the required fields are missing
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    // If user creation is successful, send a response with user data and a token
    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // If user creation fails for any reason, return an error message
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    // If an error occurs during user registration, return an internal server error
    console.error("Error during user registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if either the email or password is missing
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    // Check if no user is found with the provided email
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided password matches the stored password
    if (!(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Authentication successful, generate JWT token
    const token = generateToken(user._id);
    // Authentication successful, generate JWT token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },
      token: token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};



// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

module.exports = {
  registerUser,
  authUser,
  getUserProfile,
};
