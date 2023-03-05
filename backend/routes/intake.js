const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Intake = require("../models/IntakeForm");
const Curriculum = require("../models/Curriculum");

const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyUser
} = require("./verify");

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
router.get("/get-intakes-status/:status", async (req,res) => {
    const status = req.params.status.toLowerCase();
    try {
        switch (status) {
            case "pending-client":
            case "pending-admin":
            case "pending-programlead":
            case "approved":
            case "archived":
                console.log(`Getting intake forms with status: ${status}`);
                const intake = await Intake.find({status:status});
                console.log(intake);
                res.status(200).json(intake);
                break;
            
            default:
                res.status(500).send(`Invalid status: ${status}`);
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

// Get Intakes By ClientID By Status
router.get("/client/:clientId/:status", async (req, res) => {
    const clientId = req.params.clientId;
    const status = req.params.status.toLowerCase();
    try {
        switch (status) {
            case "pending-client":
            case "pending-admin":
            case "pending-programlead":
            case "approved":
            case "archived":
                console.log(`Getting all ${status} intakes for clientId: ${clientId}`);
                const intakes = await Intake.find({
                    clientId: clientId,
                    status: status
                });
                res.status(200).json(intakes);
                break;

            default:
                res.status(500).send(`Invalid status: ${status}`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Open Intake by ClientID
router.get("/open-intake/client/:clientId", async (req, res) => {
    const clientId = req.params.clientId;
    try {
        Intake.find({
            clientId: clientId,
            $or:[
                {status: "pending-client"},
                {status: "pending-admin"}, 
                {status: "pending-programlead"},
                {status: "approved"}
            ]
        }).then((result) => {
            res.status(200).send(result);
        })
        
    } catch (err) {
        res.status(500).json(err);
    }

}); 

// Save Unsubmitted Intake Form
router.put("/save-intake", async (req, res) => {
    console.log("save intake");
    console.log(req.body.intakeResponse);
    try {
        const clientId = req.body.clientId;
        const intakeId = req.body.intakeId;
        // If intake does not already exist
        if (intakeId === "" || intakeId === null || intakeId === "null") {
            // Make new curriculum
            const newCurriculum = new Curriculum({
                name: null,
                objectives: [
                    ["Sample Objective #1", "Sample Objective #1 Description"]
                ], // Preset curriculum objective
                steps: [
                    ["Step #1", "Step #1 Description"]
                ], // Preset curriculum lesson
                resources: [
                    ["Sample Link Title", "Link", "https://www.google.com/"]
                ]
            });

            // Save curriculum and get curriculumid
            const savedCurriculum = await newCurriculum.save();
            const newCurriculumId = savedCurriculum._id;

            // Making new intake form
            const newIntake = new Intake({
                clientId: clientId, 
                programLeadId: null, 
                curriculumId: newCurriculumId, 
                intakeResponse: req.body.intakeResponse, 
                status: "pending-client",
                needsAssessment: [
                    ["Focus Area", "Desired Future State", "Current State", "Identified Gap"] // first row of table
                ]
            });

            // Save/Create new intake form
            const savedIntake = await newIntake.save();
            res.status(200).json(savedIntake);

        } else {
            const intake = await Intake.findByIdAndUpdate(intakeId, {
                intakeResponse: req.body.intakeResponse
            });
            res.status(200).json(intake);
        }

    } catch (err) {
        res.status(500).json(err);
    }
});

// Submit Intake Form
router.put("/submit-intake", async (req, res) => {
    try {
        const intakeId = req.body.intakeId;


        // If null: make a new intake form, 
        // Else: Intake.FindByIdAndUpdate
        if (intakeId == null) {
            console.log(`Null intake, creating a new intake form`);
            const clientId = req.body.clientId;

            // Make new curriculum
            const newCurriculum = new Curriculum({
                name: null,
                objectives: [
                    ["Sample Objective #1", "Sample Objective #1 Description"]
                ], // Preset curriculum objective
                steps: [
                    ["Step #1", "Step #1 Description"]
                ], // Preset curriculum lesson
                resources: [
                    ["Sample Link Title", "Link", "https://www.google.com/"]
                ]
            });

            // Save curriculum and get curriculumid
            const savedCurriculum = await newCurriculum.save();
            const newCurriculumId = savedCurriculum._id;

            // Making a new intake form
            const newIntake = new Intake({
                clientId: clientId,
                programLeadId: null,
                curriculumId: newCurriculumId,
                intakeResponse: req.body.intakeResponse,
                status: "pending-admin",
                needsAssessment: [
                    ["Focus Area", "Desired Future State", "Current State", "Identified Gap"] // first row of table
                ]
            });

            // Save new intake form
            const savedIntake = await newIntake.save();
            res.status(200).send(savedIntake);

        } else {
            console.log(`Valid intake, updating existing intake form`);
            const intake = await Intake.findByIdAndUpdate(intakeId, {
                status: "pending-admin",
                intakeResponse: req.body.intakeResponse
            });
            res.status(200).json(intake);
        }
    } catch (err) {
        console.log("error");
        res.status(500).json(err);
    }
});

// Admin Approve Submitted Intake Form
router.put("/approve-intake/admin", async (req, res) => {
    const intakeId = req.body.intakeId;
    const programLeadId = req.body.programLeadId;
    try {
        const intake = await Intake.findByIdAndUpdate(intakeId, {
           programLeadId: programLeadId,
           status: "pending-programlead" 
        });
        res.status(200).send(`Successfully approved this intake form, awaiting Program-Lead approval`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Program-Lead Approve Submitted Intake Form
router.put("/approve-intake/programlead", async (req, res) => {
    try {
        const intakeId = req.body.intakeId;
        const curriculumName = req.body.curriculumName;

        // Update Status
        const intake = await Intake.findByIdAndUpdate(intakeId, {status: "approved"});

        // Update Curriculum Name
        const curriculum = await Curriculum.findByIdAndUpdate(intake.curriculumId, {name: curriculumName});
        res.status(200).send(`Successfully approved this intake form, it has been moved to the 'Approved Intakes' screen.`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Archive Intake by IntakeId
router.put("/archive-intake/:intakeId", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intake = await Intake.findByIdAndUpdate(intakeId, {status: "archived"});
        res.status(200).send(`Successfully archived this intake form, it has been moved to the 'Archived Intakes' screen.`);
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

// Delete Intake Form by IntakeId (this is only for testing purposes)
router.delete("/:intakeId", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        const intake = await Intake.findByIdAndRemove(intakeId);
        res.status(200).send(`Successfully removed intake with id ${intakeId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Intake Data by IntakeId
router.get("/:intakeId/view-intake", async (req, res) => {
    try {
        const intakeId = req.params.intakeId;
        console.log(intakeId);
        const intakeResponse = await Intake.findById(intakeId);
        
        res.status(200).json(intakeResponse.intakeResponse);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Edit Intake Status by IntakeId
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

// Get Intakes By ProgramLeadID By Status
router.get("/programLead/:programLeadId/:status", async (req, res) => {
    const programLeadId = req.params.programLeadId;
    const status = req.params.status.toLowerCase();
    try {
        switch (status) {
            case "pending-client":
            case "pending-admin":
            case "pending-programlead":
            case "approved":
            case "archived":
                console.log(`Getting all ${status} intakes for programLeadId: ${programLeadId}`);
                const intakes = await Intake.find({
                    programLeadId: programLeadId,
                    status: status
                });
                res.status(200).json(intakes);
                break;

            default:
                res.status(500).send(`Invalid status: ${status}`);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;