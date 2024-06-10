const express = require("express");
const router = express.Router();
const jobPostController = require("../controllers/jobPostController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, jobPostController.getAllJobPosts);
router.get("/:id", protect, jobPostController.getJobPostById);
router.post("/", protect, jobPostController.createJobPost);
router.put("/:id", protect, jobPostController.updateJobPost);
router.delete("/:id", protect, jobPostController.deleteJobPost);


router.post("/:id/applications", protect, jobPostController.createApplication);

module.exports = router;
