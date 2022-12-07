const express = require("express");
const router = express.Router();

const Curriculum = require("../models/Curriculum");

// Ignoring verification for now
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyUser
} = require("./verifyToken");

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