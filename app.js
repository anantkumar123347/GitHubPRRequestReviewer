require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const webhookRoutes = require("./routes/webhookRoutes");

const app = express();

// Raw body for GitHub signature verification
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf;
  }
}));

// Routes
app.use("/webhook", webhookRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
