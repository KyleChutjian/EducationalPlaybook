require('dotenv').config();
const PORT = 3001;
const express = require('express');
const session = require("express-session");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongooseConnectionString = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.yb6wo5k.mongodb.net/test`;
const User = require('./models/User');
var users = require('./routes/users');
var intakes = require('./routes/intake');
var curriculums = require('./routes/curriculum');
const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


mongoose.connect(mongooseConnectionString, {useNewUrlParser:true});
app.use("/user", users);
app.use("/intake", intakes);
app.use("/curriculum", curriculums);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});