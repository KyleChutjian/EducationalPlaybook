const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Verify = require("./verify");
const passport = require("passport");

// Login
router.post("/login", passport.authenticate("local"), async (req, res) => {
    await User.findOne({email: req.body.email}).then((user) => {
        // Store userId in browser
        // localStorage.setItem(userId, user._id.toString());

        const token = Verify.getToken(user);
        return res.status(200).send(token);
    }).catch((err) => {
        res.send(err);
    });
});

// Logout
router.post("/logout", async (req, res) => {
    req.logout(function(err) {
        if (err) {
            return next(err);
        }
    });
    res.send({message: "Successfully logged out"});
});

// Get Accounts
router.get("/get-accounts", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get User by UserId
router.get("/get-user/:userId", async (req, res) => {
    try {
        const userId = req.params.userId;
        User.findById(userId).then((user) => {
            res.status(200).send(user);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Accounts By Role
router.get("/get-accounts/:role", async (req, res) => {
    try {
        const role = req.params.role.toUpperCase();
        if (role == "ADMIN") {
            const users = await User.find({isAdmin:true});
            res.status(200).json(users);
        } else if (role == "PROJECTLEAD") {
            const users = await User.find({isProjectLead:true});
            res.status(200).json(users);
        } else {
            console.log("Invalid role, returning all users");
            const users = await User.find();
            res.status(200).json(users);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create Account
router.post("/create-account", async (req, res) => {
    console.log("creating a new account");
    console.log(req.body);

    await User.register(new User({email: req.body.email, firstName: req.body.firstName, lastName: req.body.lastName}), req.body.password).then((user) => {
        passport.authenticate("local")(req, res, () => {
            const token = Verify.getToken(user);
            return res
            .status(200)
            .header("x-access-token", token)
            .header("access-control-expose-headers", "x-access-token")
            .send(user);
        })
    });
});

// Updating User's Role
router.route("/manage-accounts/:userId/:role/:output").put(Verify.verifyUser,Verify.verifyAdmin, async(req, res) => {
    const userId = req.params.userId;
    const role = req.params.role.toUpperCase();
    let output = req.params.output.toUpperCase();
    console.log(`Updating User with id: ${userId} to role: ${role}`);

    try {
        // Validating Output
        if (output == "TRUE") output = true
        else if (output == "FALSE") output = false
        else {
            console.log(`Invalid output: ${output}`);
            res.status(500);
        }
        // Validating Role
        if (role == "ADMIN") {
            const user = await User.findByIdAndUpdate(userId, {isAdmin: output});
            res.status(200).json(user);

        } else if (role == "PROJECTLEAD") {
            const user = await User.findByIdAndUpdate(userId, {isProjectLead: output});
            res.status(200).json(user);
        } else {
            console.log(`Invalid role: ${role}`);
            res.status(500);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// Deleting a User by UserID
router.delete("/delete/:userId", async (req, res) => {
    const userId = req.params.userId;
    try {
        const user = await User.findByIdAndRemove(userId);
        res.status(200).send(`Deleted user with id ${userId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Dashboards by UserId
router.get("/dashboards/:userId", async (req, res) => {
    const userId = req.params.userId;
    let dashboards = ["Client"];
    try {
        const user = await User.findById(userId);
        if (user.isAdmin) dashboards.push("Admin");
        if (user.isProjectLead) dashboards.push("ProjectLead");
        res.status(200).json(dashboards);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;