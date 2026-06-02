const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No resume uploaded",
      });
    }

    console.log("Uploaded file:", req.file.originalname);
    console.log("File size:", req.file.size);
    console.log("Mime type:", req.file.mimetype);

  const pdfData = await pdfParse(req.file.buffer);

const resume = await Resume.create({
  userId: req.user.id,
  fileName: req.file.originalname,
  resumeText: pdfData.text,
});

  res.status(200).json({
  message: "Resume saved successfully",
  resumeId: resume._id,
  fileName: resume.fileName,
});
  } catch (error) {
    console.log("RESUME UPLOAD ERROR:", error);

    res.status(500).json({
      message: "Server error while parsing resume",
      error: error.message,
    });
  }
};

const getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({
        message: "No resume found",
      });
    }

    res.status(200).json({
      message: "Resume fetched successfully",
      resume,
    });
  } catch (error) {
    console.log("GET RESUME ERROR:", error);

    res.status(500).json({
      message: "Server error while fetching resume",
    });
  }
};

module.exports = { uploadResume, getMyResume };