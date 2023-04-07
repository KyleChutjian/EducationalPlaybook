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
            case "pending-projectlead":
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
            case "pending-projectlead":
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
                {status: "pending-projectlead"},
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
        const intakeName = req.body.name;
        console.log(intakeName);
        // If intake does not already exist
        if (intakeId === "" || intakeId === null || intakeId === "null") {

            // Make new curriculum
            const newCurriculum = new Curriculum({
                name: intakeName,
                objectives: ["Sample Learning Objective"], // Preset curriculum objective
                steps: [["Step #1", "Step #1 Description"]], // Preset curriculum lesson
                // resources: [["Sample Link Title", "Link", "https://www.google.com/"]] // Preset resource link
                links: [{
                    title: 'Sample Link Title',
                    output: 'https://www.google.com/'
                }], // Preset resource link
                files: []
            });

            // Save curriculum and get curriculumid
            const savedCurriculum = await newCurriculum.save();
            const newCurriculumId = savedCurriculum._id;

            // Making new intake form
            const newIntake = new Intake({
                name: intakeName,
                clientId: clientId, 
                projectLeadIds: [], 
                curriculumId: newCurriculumId, 
                intakeResponse: req.body.intakeResponse, 
                status: "pending-client",
                needsAssessment: [
                    ["", "", "", ""] // first row of table
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
        console.log(err);
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
                name: req.body.name,
                objectives: ["Sample Learning Objective"], // Preset curriculum objective
                steps: [["Step #1", "Step #1 Description"]], // Preset curriculum lesson
                links: [{
                    title: 'Sample Link Title',
                    output: 'https://www.google.com/'
                }], // Preset resource link
                files: []
            });

            // Save curriculum and get curriculumid
            const savedCurriculum = await newCurriculum.save();
            const newCurriculumId = savedCurriculum._id;

            // Making a new intake form
            const newIntake = new Intake({
                name: req.body.name,
                clientId: clientId,
                projectLeadIds: [],
                curriculumId: newCurriculumId,
                intakeResponse: req.body.intakeResponse,
                status: "pending-admin",
                needsAssessment: [
                    ["", "", "", ""] // first row of table
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
    const projectLeadIds = req.body.projectLeadIds;
    try {
        const intake = await Intake.findByIdAndUpdate(intakeId, {
            projectLeadIds: projectLeadIds,
           status: "pending-projectlead" 
        });
        res.status(200).send(`Successfully approved this intake form, awaiting Project-Lead approval`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Project-Lead Approve Submitted Intake Form
router.put("/approve-intake/projectlead", async (req, res) => {
    try {
        const intakeId = req.body.intakeId;
        // const curriculumName = req.body.curriculumName;

        // Update Status
        const intake = await Intake.findByIdAndUpdate(intakeId, {status: "approved"});

        // Update Curriculum Name
        // const curriculum = await Curriculum.findByIdAndUpdate(intake.curriculumId, {name: curriculumName});
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

// Get Intakes By Permission Level By Status
router.get("/getIntake-permission-status/:permission/:userId", async (req, res) => {

    try {
        const permissionLevel = req.params.permission.toLowerCase();
        const userId = req.params.userId;
        if (permissionLevel === "admin") {
            console.log(`Getting all pending-admin intakes as an administrator`);
            const intakes = await Intake.find({
                status: "pending-admin"
            });
            console.log(intakes);
            res.status(200).json(intakes);
        } else if (permissionLevel === "projectlead") {
            console.log(`Getting all pending-projectlead intakes for projectLeadId: ${userId}`);
            const intakes = await Intake.find({
                projectLeadIds: {$in: userId},
                status: "pending-projectlead"
            });
            console.log(intakes);
            res.status(200).json(intakes);
        } else {
            console.log(`Something went wrong with permission: ${permissionLevel} and userid: ${userId}`);
            res.status(500).send('Invalid permission level');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/assign-projectleads/:intakeId", async (req, res) => {
    try {
        console.log('test');
        const intakeId = req.params.intakeId;
        const projectLeadIds = req.body.projectLeadIds;
        console.log(projectLeadIds);
        Intake.findByIdAndUpdate(intakeId, {
            projectLeadIds: projectLeadIds,
            status: "pending-projectlead"
        }, {new: true}).then((result) => {
            console.log(result);
            res.status(200).send(result);
        })

    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;