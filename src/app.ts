import express from "express";
import mongoose from "mongoose";
import router from "./router";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const dbAddr = process.env.MONGODB_ADDR;
const port = process.env.PORT || 3000;

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(dbAddr).then(() => {
  console.log("Successfuly connected to database");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.listen(port, () => {
  console.log("Server is running...");
});
