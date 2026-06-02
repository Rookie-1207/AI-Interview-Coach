const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-lite",
});

const generateQuestions = async (resumeText) => {
  const prompt = `
You are an expert technical interviewer.

Based on this resume:

${resumeText}

Generate:

HR Questions:
1.
2.
3.
4.
5.

Technical Questions:
1.
2.
3.
4.
5.

Project-Based Questions:
1.
2.
3.
4.
5.
`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.log("Gemini failed, using fallback...");

    return `
HR Questions:
1. Tell me about yourself.
2. Why should we hire you?
3. What are your strengths?
4. What are your weaknesses?
5. Where do you see yourself in 5 years?

Technical Questions:
1. Explain OOP concepts.
2. What is the difference between C and C++?
3. Explain inheritance and polymorphism.
4. What are Data Structures?
5. Explain arrays and linked lists.

Project-Based Questions:
1. Explain your Currency Converter project.
2. What technologies did you use in your project?
3. What challenges did you face while developing it?
4. How would you improve your project?
5. What did you learn from building the project?
`;
  }
};

module.exports = { generateQuestions };