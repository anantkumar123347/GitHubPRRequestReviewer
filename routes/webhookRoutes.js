const express = require("express");
const router = express.Router();
const handleWebhook = require("../controllers/webhookController");
const verifySignature = require("../utils/verifySignature");

router.post("/", (req, res, next) => {
  if (!verifySignature(req)) {
    return res.status(401).send("Invalid signature");
  }
  next();
}, handleWebhook);

module.exports = router;
