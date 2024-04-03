import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from "./routes/user.router.js";

const app = express();
const port = 3000;
dotenv.config();
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });


  app.use(express.json());

app.use(cors({
  credentials:true,
  origin:"http://localhost:5173"
}));

app.use("/api/user", userRouter);

app.use(express.json());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error!";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.get("/", (req, res) => {
  res.send("Everything is Okay!");
});


app.listen(port, () => {
  console.log(`Server ${port} is running!`);
});
