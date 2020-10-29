const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

const auth = require("./routes/api/auth");

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//DB Config
const db = require("./config/keys").mongoURI;

//connect to mongodb
mongoose
  .connect(db)
  .then(() => {
    console.log("mongoDB connected");
  })
  .catch((err) => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport Config
// require('./config/passport')(passport);

app.use("/api/auth", auth);

const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
