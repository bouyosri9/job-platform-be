const Application = require("../models/Application");
const JobPost = require("../models/JobPost");

const getAllJobPosts = async () => {
  return await JobPost.find();
};

const getJobPostById = async (id) => {
  return await JobPost.findById(id);
};

const createJobPost = async (jobPostData, userId) => {
  const jobPost = new JobPost({ ...jobPostData, createdBy: userId });
  return await jobPost.save();
};


const updateJobPost = async (id, jobPostData) => {
  return await JobPost.findByIdAndUpdate(id, jobPostData, { new: true });
};

const deleteJobPost = async (id) => {
  return await JobPost.findByIdAndDelete(id);
};

const createApplication = async (applicationData, userId) => {
  const application = new Application({ ...applicationData, user: userId });
  return await application.save();
};

module.exports = {
  getAllJobPosts,
  getJobPostById,
  createJobPost,
  updateJobPost,
  deleteJobPost,
  createApplication,
};