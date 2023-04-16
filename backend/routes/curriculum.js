const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();

const Curriculum = require("../models/Curriculum");
const Intake = require("../models/IntakeForm");
const fsPromise = require('node:fs/promises');
const fs = require('fs');


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

// Get File by FilePath
router.get('/getFile/:path', async (req, res) => {
    try {
        // Removing /routes from current directory
        const directory = __dirname.substring(0, __dirname.length-7);
        const decodedPath = decodeURIComponent(req.params.path);
        
        // Build filepath
        const path = `${directory}//files//${decodedPath}`;

        // Send file
        res.sendFile(path);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Upload Files
router.post("/:curriculumId/uploadFiles", async (req, res) => {
    try {
        const curriculumId = req.params.curriculumId;
        const ids = JSON.parse(req.body.fileIds);
        const titles = JSON.parse(req.body.fileTitles);

        console.log('---------------------------------------------------------------------------------------------');
        console.log(ids);
        console.log(titles);

        const newFileArray = [];

        // Deleting all files from Curriculum
        await Curriculum.findById(curriculumId).then((curriculum) => {
            curriculum.files.forEach(async (file) => {
                if (file.output !== "") {
                    // console.log(`${__dirname}\\..\\files\\${file.output}`)
                    if (fs.existsSync(`${__dirname}\\..\\files\\${file.output}`)) {
                        await fsPromise.unlink(`${__dirname}\\..\\files\\${file.output}`);
                    } else {
                        console.log('File below not found:')
                        console.log(`${__dirname}\\..\\files\\${file.output}`)
                    }
                    
                }
            });
        });

        await Curriculum.findByIdAndUpdate(curriculumId, {$set: {'files': []}})

        if (req.files === null) {
            res.status(200).send('No files to delete');
        } else if (typeof req.files.file.length === 'number') {
            const uploadedFiles = [];
            const errors = [];


            req.files.file.forEach((file, index) => {
                const saveAs = `${curriculumId}_${file.md5}_${file.name}`

                newFileArray.push({
                    title: titles[index],
                    output: saveAs
                });

                file.mv(`${__dirname}\\..\\files\\${saveAs}`, (err) => {
                    if (err) errors.push(err);
                    else uploadedFiles.push(saveAs);
                })
            });


            console.log(newFileArray);
            if (errors.length > 0) {
                console.log('Error');
                return res.status(500).json({errors});
            } else {

                await Curriculum.findByIdAndUpdate(curriculumId, {files: newFileArray});

                console.log('Done');
                return res.status(200).json({uploadedFiles});
                
            }



        } else if (typeof req.files.file.length === 'undefined') {
            console.log('one file');
            console.log(req.files.file);
            const saveAs = `${curriculumId}_${req.files.file.md5}_${req.files.file.name}`

            newFileArray.push({
                title: titles[0],
                output: saveAs
            });
            console.log(newFileArray);
            req.files.file.mv(`${__dirname}\\..\\files\\${saveAs}`, (err) => {
                if (err) res.status(500).json(err);
            });

            await Curriculum.findByIdAndUpdate(curriculumId, {files: newFileArray});
            console.log('Done');
            return res.status(200).send('Success');
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

// Save Curriculum Changes
router.put("/:curriculumId/saveChanges", async (req, res) => {
    const curriculumId = req.params.curriculumId;
    console.log(`Saving changes to curriculum with id: ${curriculumId}`);
    
    try {
        const objectives = req.body.objectives;
        const plan = req.body.plan;
        const links = req.body.links;
        
        await Curriculum.findByIdAndUpdate(curriculumId, 
            {objectives: objectives, plan: plan, links: links}, 
            {$new: true}).then((curriculum) => {
                res.status(200).json(curriculum);
            });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
});

// The rest are probably not needed:

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