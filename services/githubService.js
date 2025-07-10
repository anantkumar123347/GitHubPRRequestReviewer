const axios = require("axios");

async function fetchPRDiff(diffUrl) {
  const response = await axios.get(diffUrl, {
    headers: { "Accept": "application/vnd.github.v3.diff" }
  });
  return response.data;
}

module.exports = { fetchPRDiff };
