require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const cors = require("cors");
const goalRouter = require("./routes/goalRouter");
// const MONGO_URL =
//   "mongodb+srv://ezebibian4:chichekwam3@cluster0.i5ydsnc.mongodb.net/goalserver?retryWrites=true&w=majority";

// MIDDLEWARES
app.use(express.json());
app.use(cors());

//ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Goals API" });
});
app.use(goalRouter)

// /api/goals
app.use("/api/goals", goalRouter)

//ERROR ROUTES
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

//DATABASE CONNECTIONS AND SERVER LISTENING

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, { dbName: "goalserver" });
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
startServer();
