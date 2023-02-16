const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.getToken = (user) =>  {
  const account = {
    email: user.email,
    id: user._id
  };
  return jwt.sign(account, process.env.SECRET, {expiresIn: 3600}); // expires in 1h
};

exports.verifyUser = (req, res, next) => {
  // Get any token available
  var token = req.body.token || req.query.token || req.headers["x-access-token"];
  console.log(token);

  // if token is not null, decode it
  if (token) { 
    jwt.verify(token, process,env.SECRET, function(err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated!");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      } 
    });
  } else {
      // no token, throw back an error
      var err = new Error("No token found");
      err.status = 403;
      return next(err);
  }
};

exports.verifyAdmin = (req, res, next) => {
  console.log(req.decoded);
  if (req.decoded.isAdmin) {
    console.log("Admin verified");
    next();
  } else {
    const err = new Error("You are not an account with administrative permission!");
    err.status = 403;
    return next(err);
  }
};