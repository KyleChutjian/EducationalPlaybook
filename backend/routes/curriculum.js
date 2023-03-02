const express = require("express");
const router = express.Router();

const Curriculum = require("../models/Curriculum");
const Intake = require("../models/IntakeForm");

// Ignoring verification for now
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyUser
} = require("./verify");

// Get All Curriculums
router.get("/", async (req, res) => {
    try {
        const curriculums = await Curriculum.find();
        res.status(200).json(curriculums);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Curriculum by CurriculumID
router.get("/:curriculumId", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    try {
        const curriculum = await Curriculum.findById(curriculumId);
        res.status(200).json(curriculum);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Curriculum by IntakeID
router.get("/get-curriculum-intake/:intakeId", async (req, res) => {
    const intakeId = req.params.intakeId;
    try {
        const intake = await Intake.findById(intakeId);
        const curriculum = await Curriculum.findById(intake.curriculumId);

        res.status(200).send(curriculum);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete Curriculum by CurriculumID (this is only for testing purposes)
router.delete("/:curriculumId", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    try {
        const curriculum = await Curriculum.findByIdAndRemove(curriculumId);
        res.status(200).send(`Successfully removed curriculum with id ${curriculumId}`);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Learning Objectives by CurriculumID
router.get("/:curriculumId/learningObjectives", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    try {
        const curriculum = await Curriculum.findById(curriculumId);
        console.log(curriculum);
        res.status(200).json(curriculum.objectives);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add New Learning Objective
router.put("/add-learning-objective/:curriculumId", async (req, res) => {
    console.log("add new learning objective");
    const curriculumId = req.params.curriculumId;

    try {
        const learningObjective = req.body.learningObjective;
        const newLearningObjective = [learningObjective.title, learningObjective.description];

        const curriculum = await Curriculum.findByIdAndUpdate(
            curriculumId, 
            { $push: {objectives: newLearningObjective}}, 
            {returnDocument: 'after'}).then((result) => {
            console.log(result);
            res.status(200).send(result);
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Create/Update Learning Objectives by CurriculumID
router.put("/:curriculumId/update-learningObjective", async (req, res) => {
    const curriculumId = req.params.curriculumId;

    try {
        const curriculum = await Curriculum.findByIdAndUpdate(curriculumId, {objectives: req.body.newLearningObjectives});
        res.status(200).json(curriculum);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete 1 Learning Objective by CurriculumID
router.delete("/:curriculumId/delete-learningObjective/:index", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    const index = req.params.index;
    try {
        const curriculum = await Curriculum.findById(curriculumId);
        let objectives = curriculum.objectives;

        if (index > -1 && req.body && index < objectives.length) {
            objectives.splice(index, 1);
        } else res.status(500).send("Invalid index");
        
        const newCurriculum = await Curriculum.findByIdAndUpdate(curriculumId, {objectives: objectives});
        res.status(200).json(newCurriculum);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get Lessons by CurriculumID
router.get("/:curriculumId/get-lessons", async(req, res) => {
    const curriculumId = req.params.curriculumId;
    try {
        const curriculum = await Curriculum.findById(curriculumId);
        console.log(curriculum);
        res.status(200).json(curriculum.lessons);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Create/Update Lessons by CurriculumID
router.put("/:curriculumId/update-lessons", async (req, res) => {
    const curriculumId = req.params.curriculumId;

    try {
        const curriculum = await Curriculum.findByIdAndUpdate(curriculumId, {lessons: req.body.newLessons});
        res.status(200).json(curriculum);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete 1 Lesson by CurriculumID by Index
router.delete("/:curriculumId/delete-lesson/:index", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    const index = req.params.index;
    try {
        const curriculum = await Curriculum.findById(curriculumId);
        let lessons = curriculum.lessons;
        console.log(lessons);

        if (index > -1) {
            lessons.splice(index, 1);
        } else res.status(500).send("Invalid index");

        console.log(lessons);
        
        const newCurriculum = await Curriculum.findByIdAndUpdate(curriculumId, {lessons: lessons});
        res.status(200).json(newCurriculum);

    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;