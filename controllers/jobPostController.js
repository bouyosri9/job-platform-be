const jobPostService = require("../services/jobPostService");

const getAllJobPosts = async (req, res) => {
  try {
    const jobPosts = await jobPostService.getAllJobPosts();
    res.json(jobPosts);
  } catch (error) {
    console.error("Error fetching job posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getJobPostById = async (req, res) => {
  try {
    const jobPost = await jobPostService.getJobPostById(req.params.id);
    if (!jobPost) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    res.json(jobPost);
  } catch (error) {
    console.error("Error fetching job post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createJobPost = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user's information
    const newJobPost = await jobPostService.createJobPost(req.body, userId);
    res.status(201).json(newJobPost);
  } catch (error) {
    console.error("Error creating job post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateJobPost = async (req, res) => {
  try {
    const updatedJobPost = await jobPostService.updateJobPost(
      req.params.id,
      req.body
    );
    if (!updatedJobPost) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    res.json(updatedJobPost);
  } catch (error) {
    console.error("Error updating job post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteJobPost = async (req, res) => {
  try {
    const deletedJobPost = await jobPostService.deleteJobPost(req.params.id);
    if (!deletedJobPost) {
      return res.status(404).json({ message: "Job Post not found" });
    }
    res.json({ message: "Job Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting job post:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const createApplication = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming req.user contains the authenticated user's information
    const newApplication = await jobPostService.createApplication(
      req.body,
      userId
    );
    res.status(201).json(newApplication);
  } catch (error) {
    console.error("Error creating application:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports = {
  getAllJobPosts,
  getJobPostById,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  createApplication
};
