const Resume = require("../models/Resume");
const Interview = require("../models/Interview");
const { generateQuestions } = require("../services/geminiService");

const generateInterviewQuestions = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    if (!resume) {
      return res.status(404).json({ message: "No resume found" });
    }

    const questions = await generateQuestions(resume.resumeText);

    const interview = await Interview.create({
      userId: req.user.id,
      resumeId: resume._id,
      questions,
    });

    res.status(200).json({
      message: "Interview questions generated successfully",
      interview,
    });
  } catch (error) {
    console.log("GENERATE INTERVIEW ERROR:", error);
    res.status(500).json({
      message: "Server error while generating interview questions",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions };