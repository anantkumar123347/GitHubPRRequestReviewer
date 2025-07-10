require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};
