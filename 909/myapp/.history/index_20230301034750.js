// Import dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Create express app
const app = express();

// Set up middleware
app.use(cors());
app.use(express.json());

// Set up database connection
mongoose.connect(
  "mongodb+srv://namanhhd4:WG6uDHweZMbKDBRi@cluster0.e1zwvzv.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to database!");
});

// Define schema and model for data
const dataSchema = new mongoose.Schema({
  text: String,
});
const Data = mongoose.model("Data", dataSchema);

// Set up endpoints
app.get("/data", async (req, res) => {
  try {
    const stream = Data.find().stream();

    stream.on("data", (data) => {
      res.write(JSON.stringify(data));
    });

    stream.on("end", () => {
      res.end();
    });

  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.delete("/data/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Data.findByIdAndDelete(id);
    res.json({ message: "Data deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Set up proxy middleware for load balancing
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:8000",
    changeOrigin: true,
  })
);

// Start server
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
