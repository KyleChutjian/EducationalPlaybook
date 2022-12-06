const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Intake = require("../models/IntakeForm");
const Curriculum = require("../models/Curriculum");

// Ignoring verification for now

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyUser
} = require("./verifyToken");

// Get All Intake Forms
router.get("/", async (req,res) => {
    console.log(`Getting all intake forms`);
    try {
        const intakes = await Intake.find();
        res.status(200).json(intakes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intake Forms by Status
router.get("/get-intakes/:status", async (req,res) => {
    const status = req.params.status.toLowerCase();
    console.log(`Getting intake forms with status: ${status}`);

    try {
        if (status == "pending" || status == "approved" || status == "archived") {
            const intake = await Intake.find({status:status});
            res.status(200).json(intake);
        } else {
            res.status(500);
        }


    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intake Form by IntakeID
router.get("/get-intake/:intakeId", async (req,res) => {
    const intakeId = req.params.intakeId;
    console.log(`Getting intake with id: ${intakeId}`);

    try {
        const intake = await Intake.findById(intakeId);
        res.status(200).json(intake);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Submit Intake Form
router.post("/submit-intake", async (req, res) => {
    try {
        const clientId = req.body.clientId; // not needed?
        console.log(`User with id: ${clientId} is creating a new intake form`);
        console.log(req.body.curriculumName);
        console.log(req.body.curriculumLessons);

        // Make new curriculum:
        const newCurriculum = new Curriculum({
            name: req.body.curriculumName,
            lessons: req.body.curriculumLessons,
            objectives: ["Sample Objective #1"]
        });

        // Save curriculum and get curriculumid
        const savedCurriculum = await newCurriculum.save();
        const newCurriculumId = savedCurriculum._id;

        // Making new intake form
        const newIntake = new Intake({
            clientId: clientId, 
            programLeadId: req.body.programLeadId, 
            curriculumId: newCurriculumId, 
            intakeResponse: req.body.intakeResponse, 
            status: "pending",
            needsAssessment: [
                ["Focus Area", "Desired Future State", "Current State", "Identified Gap"],
                ["Innovation", "To be recognized as...", "We are not currently known...", "40%"]
            ]
        });

        // Save new intake form
        const savedIntake = await newIntake.save();
        res.status(200).json(savedIntake);
    } catch (err) {
        res.status(500).json(err);
    }

});

// Edit Intake Form by IntakeId
router.put("/:intakeId/edit-intake", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intake = await Intake.findByIdAndUpdate(intakeId, { intakeResponse: req.body.newIntakeResponse});
        res.status(200).json(intake);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intake Data by IntakeId
router.get("/:intakeId/view-intake", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intakeResponse = await Intake.findById(intakeId);
        res.status(200).json(intakeResponse.intakeResponse);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit Needs Assessment by IntakeId
router.put("/:intakeId/edit-intake-status/:status", async (req, res) => {
    try {
        const status = req.params.status.toLowerCase();
        if (status != "pending" && status != "approved" && status != "archived") {
            res.status(500).send(`Invalid Status: ${status}`);
        }
        const intakeId = req.params.intakeId;
        const intake = await Intake.findByIdAndUpdate(intakeId, { status: status});
        res.status(200).json(intake);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Needs Assessment by IntakeId
router.get("/:intakeId/view-needsAssessment", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intakeResponse = await Intake.findById(intakeId);
        res.status(200).json(intakeResponse.needsAssessment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit Needs Assessment by IntakeId
router.put("/:intakeId/edit-needsAssessment", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intake = await Intake.findByIdAndUpdate(intakeId, { needsAssessment: req.body.newNeedsAssessment});
        res.status(200).json(intake);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intakes By ClientID By Status
router.get("/client/:clientId/:status", async (req, res) => {
    const clientId = req.params.clientId;
    const status = req.params.status.toLowerCase();

    if (status != "pending" && status != "approved" && status != "archived") {
        res.status(500).send(`Invalid status: ${status}`);
    }


    console.log(`Getting all ${status} intakes for clientId: ${clientId}`);
    try {
        const intakes = await Intake.find({
            clientId: clientId,
            status: status
        });
        res.status(200).json(intakes);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intakes By ProgramLeadID By Status
router.get("/programLead/:programLeadId/:status", async (req, res) => {
    const programLeadId = req.params.programLeadId;
    const status = req.params.status.toLowerCase();

    if (status != "pending" && status != "approved" && status != "archived") {
        res.status(500).send(`Invalid status: ${status}`);
    }


    console.log(`Getting all ${status} intakes for clientId: ${programLeadId}`);
    try {
        const intakes = await Intake.find({
            programLeadId: programLeadId,
            status: status
        });
        res.status(200).json(intakes);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;