const sendToGPT = require("../services/gptService");
const { fetchPRDiff } = require("../services/githubService");

async function handleWebhook(req, res) {
  const event = req.headers["x-github-event"];
  const payload = req.body;

  if (event === "pull_request" && payload.action === "opened") {
    const prNumber = payload.pull_request.number;
    const diffUrl = payload.pull_request.diff_url;

    console.log(` New PR #${prNumber} - Fetching diff from: ${diffUrl}`);

    try {
      const diffText = await fetchPRDiff(diffUrl);
      const review = await sendToGPT(diffText);
      console.log(" GPT Review:\n", review);
    } catch (err) {
      console.error(" Error:", err.message);
    }
  }

  res.send(" Webhook received");
}

module.exports = handleWebhook;
