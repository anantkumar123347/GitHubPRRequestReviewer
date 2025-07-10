const crypto = require("crypto");
const { GITHUB_SECRET } = require("../config/config");

function verifySignature(req) {
  const signature = req.headers["x-hub-signature-256"];
  const hmac = crypto.createHmac("sha256", GITHUB_SECRET);
  const digest = `sha256=${hmac.update(req.rawBody).digest("hex")}`;
  return signature === digest;
}

module.exports = verifySignature;
