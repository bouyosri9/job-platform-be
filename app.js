const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db"); // Import the connectDB function

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Import user and auth routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const jobPostRoutes = require("./routes/jobPostRoutes");


// Use user and auth routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/job-posts", jobPostRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
