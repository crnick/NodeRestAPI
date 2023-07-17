const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config(); // pull all env variables

//initializing express to configure our server
const app = express();

//connect to database
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

const db = mongoose.connection; //initializing databse

//if there is problem connecting to database
db.on("error", (error) => {
  console.log(error);
});

db.once("open", () => {
  console.log("connected to database");
}); // once we connect

//server can accept json as a request
app.use(express.json()); //middleware when it receives request before it gets passed to routes
const subscribersRoutes = require("./routes/subscribers");

app.use("/subscribers", subscribersRoutes); //use this routes whenever it matches this path

app.listen(3000, () => console.log("server has started"));
