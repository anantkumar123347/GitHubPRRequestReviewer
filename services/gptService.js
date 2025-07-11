const axios = require("axios");
const { OPENAI_API_KEY } = require("../config/config");
const estimateTokens = require("../utils/tokenEstimator");

const MAX_TOKENS = 120000;

async function sendToGPT(diffText) {
  try {
    const tokens = estimateTokens(diffText);
    if (tokens > MAX_TOKENS) {
      return " Diff is too large to process. Please split it.";
    }

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a senior software engineer. Review the following GitHub Pull Request diff. Highlight bugs, improvements, or suggest better practices."
          },
          {
            role: "user",
            content: `Here is the code diff:\n\n${diffText}`
          }
        ],
        temperature: 0.3
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(" GPT API Error:", error.response?.data || error.message);
    return " Error: Failed to get a review from GPT.";
  }
}

module.exports = sendToGPT;
