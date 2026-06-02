import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-interview-coach-5owe.onrender.com/api",
});

export default API;