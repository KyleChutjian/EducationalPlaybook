require('dotenv').config();
const PORT = 3001;
const express  = require('express');
const session = require("express-session");
const fileUpload = require("express-fileupload");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
console.log(process.env.PASSWORD)
const mongooseConnectionString = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.yb6wo5k.mongodb.net/test`;
const User = require('./models/User');
var users = require('./routes/users');
var intakes = require('./routes/intake');
var curriculums = require('./routes/curriculum');
const app = express();

// Middlewares
app.use(bodyParser.json({limit: '50mb', extended: true}));

app.use(bodyParser.urlencoded({limit: '50mb', extended:true, parameterLimit: 10000}));
app.use(cors());
app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(fileUpload({
    useTempFiles: true,
    preserveExtension: true,
    tempFileDir: `${__dirname}/files`
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