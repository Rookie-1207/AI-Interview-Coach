const express = require("express");
const multer = require("multer");
const protect = require("../middleware/authMiddleware");
const {
  uploadResume,
  getMyResume,
} = require("../controllers/resumeController");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/upload", protect, upload.single("resume"), uploadResume);
router.get("/my-resume", protect, getMyResume);

module.exports = router;