require('dotenv').config();

const PORT = 3001;

const mongooseConnectionString = `mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@cluster0.yb6wo5k.mongodb.net/test`;

const express = require('express');
const app = express();
const cors = require("cors");
const mongoose = require('mongoose');

// Routes
var users = require('./routes/users');
var auth = require('./routes/auth');


// Middlewares
app.use(express.json());
app.use(cors());



mongoose.connect(mongooseConnectionString, {useNewUrlParser:true});
app.use("/user", users);
// app.use("/auth", auth);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});