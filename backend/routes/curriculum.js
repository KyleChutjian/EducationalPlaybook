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
        console.log(decodedPath);
        // Build filepath
        const path = `${directory}\\files\\${decodedPath}`;

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
                    console.log(`${__dirname}\\..\\files\\${file.output}`)
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

        // titles.forEach((specificTitle) => {
        //     newFileArray.push({
        //         title: specificTitle,
        //         output:

        //     })
        // })

        // await Curriculum.findById(curriculumId).then((curriculum) => {
            
        // })

        var mongoResourceIndex;


        // Deleting All Files with an output (They exist already, need to overwrite it)
        // await Curriculum.findById(curriculumId).then(async (curriculum) => {
        //     console.log(curriculum.resources);
        //     await curriculum.resources.forEach(async (resource, index) => {
        //         // Delete all files
        //         if (resource.output !== "" && resource.type === 'file') {
        //             console.log(`${__dirname}\\..\\files\\${resource.output}`)
        //             await fs.unlink(`${__dirname}\\..\\files\\${resource.output}`);
        //         }
        //         // If current resource id is not in ids[], it was removed. Delete in MongoDB
        //         if (!ids.includes(resource._id.toString()) && resource.type === 'file') {
        //             console.log(`${resource._id} isn't in ids[], deleting resource index ${index} in Mongo`);
        //             const update = {resource: index};

        //             const deletedResource = await Curriculum.findByIdAndUpdate(curriculumId, {$pop: update});
        //             console.log(`Deleted ${deletedResource.title} with output: ${deletedResource.output}`);
        //         } else {
        //             console.log(`ID ${resource._id} is in ids array`);
        //         }
        //     });
        // });

        // await Curriculum.findById(curriculumId).then((curriculum) => {
        //     console.log('Resources After Removing Deleted Files');
        //     console.log(curriculum.resources);
        // })


        // Multiple files
        // if (typeof req.files.file.length === 'number') {
        //     console.log('printing multiple files---------------------------------------------------------------------------------');
        //     const uploadedFiles = [];
        //     const errors = [];

        //     const outputs = req.files.file.map((file) => {
        //         return `${file.md5}_${file.name}`;
        //     });

        //     // Iterate through each file
        //     req.files.file.forEach(async (file, fileIndex) => {
        //         const saveAs = `${file.md5}_${file.name}`;

        //         await Curriculum.findById(curriculumId).then((curriculum) => {
        //             var fileCounter = 0;
        //             curriculum.resources.forEach(async (resource, index) => {
        //                 if (resource.type === 'file') {
                            
        //                     const update = {};
        //                     update[`resources.${index}.output`] = outputs[fileCounter];
        //                     fileCounter++;
        //                     console.log(update);
        //                     await Curriculum.findByIdAndUpdate(curriculumId, {$set: update});
        //                 }


        //                 // if (resource.output === "") {
        //                 //     titles.forEach((currentTitle) => {
        //                 //         if (currentTitle === resource.title) {
        //                 //             const update = {};
        //                 //             update[`resources.${index}.output`] = saveAs;

        //                 //             Curriculum.findByIdAndUpdate(curriculumId, {$set: update});
        //                 //         }
        //                 //     })
        //                 // }
        //             });
        //         });

        //         // Curriculum.findByIdAndUpdate(curriculumId, {$set: update})

                

        //         file.mv(`${__dirname}\\..\\files\\${saveAs}`, (err) => {
        //             if (err) {
        //                 errors.push(err);
        //             } else {
        //                 uploadedFiles.push(saveAs);
        //             }
                    
        //         });
        //     });
        //     if (errors.length > 0) {
        //         return res.status(500).json({errors});
        //     } else {


        //         return res.status(200).json({uploadedFiles});
        //     }
        // } else { // One file
        //     console.log('printing 1 file');

        //     // if (ids[0] !== null) {

        //     await Curriculum.findById(curriculumId).then((curriculum) => {
        //         console.log(ids)
        //         curriculum.resources.forEach((resource, index) => {
        //             console.log(resource._id);
                    
        //             if (resource.type === 'file') {
        //                 mongoResourceIndex = index;
        //                 console.log(mongoResourceIndex);

        //             }
        //         })
        //     });

        //     //     // Get saved file locations


        //     // } else {
        //     //     console.log(`File ${req.files.file.name} id does not exist, only creating it`);
        //     // }
        //     const saveAs = `${req.files.file.md5}_${req.files.file.name}`;

        //     await req.files.file.mv(`${__dirname}\\..\\files\\${saveAs}`, async (err) => {
        //         if (err) {
        //             console.log(err);
        //             return res.status(500).send(err);
        //         }

        //         const update = {};
        //         update[`resources.${mongoResourceIndex}.output`] = saveAs;
        //         console.log(update);
        //         await Curriculum.findByIdAndUpdate(curriculumId, {
        //             $set: update
        //         }, {new: true}).then((updatedCurriculum) => {
        //             console.log(updatedCurriculum)
        //         })

        //         return res.status(200).json({status: 'uploaded', saveAs});
        //     });
        // }
        console.log('end');
        // res.status(200).send('Success');

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
    
    
    



    
    
    // try {
    //     console.log(req.body.resources);

    //     const curriculum = await Curriculum.findByIdAndUpdate(curriculumId, {
    //         steps: req.body.steps,
    //         objectives: req.body.objectives,
    //         resources: req.body.resources
    //     }, {returnDocument: "after"}).then((savedCurriculum) => {
    //         console.log(savedCurriculum);
    //         res.status(200).send(savedCurriculum);
    //     });


    // } catch (err) {
    //     res.status(500).json(err);
    // }
});

// Save Curriculum Changes
router.put("/:curriculumId/saveChanges", async (req, res) => {
    console.log('\n\n\n\n\n\n\n');
    const curriculumId = req.params.curriculumId;
    console.log(`Saving changes to curriculum with id: ${curriculumId}`);
    
    try {
        const objectives = req.body.objectives;
        const steps = req.body.steps;
        const links = req.body.links;
        // const files = req.body.files;
        
        await Curriculum.findByIdAndUpdate(curriculumId, 
            {objectives: objectives, steps: steps, links: links}, 
            {$new: true}).then((curriculum) => {
                res.status(200).json(curriculum);
            });

        

        // Only deleting links/files
        // await Curriculum.findById(curriculumId).then((curriculum) => {
        //     if (curriculum.resources.length === 0) {
        //         console.log('Push all resources');


        //     }


        //     // Not run if length is 0
        //     curriculum.resources.forEach(async (resource, resourceIndex) => {
        //         if (resourceIds.includes(resource._id.toString())) {
        //             console.log(`Resource exists already, keeping ${resource.title} at index ${resourceIndex}`);


        //         } else if (typeof resource._id === 'object') {
        //             console.log(`Delete ${resource.title} at index ${resourceIndex}`);
        //             console.log(`ResourceId: ${resource._id}`);
        //             // const deletedResource = await Curriculum.findByIdAndUpdate(curriculumId, {$pull: {resources: {_id: resource._id}}}, {$new: true});
        //             // console.log(deletedResource.resources);
        //         } else {
        //             // create new
        //             console.log(`Creating new resource:`);
        //             console.log(resource);
        //         }
        //     });
        // });
        // await resources.forEach(async (resource, resourceIndex) => {
        //     console.log(resources[resourceIndex]._id);
        //     if (typeof resources[resourceIndex]._id === 'undefined') {
        //         console.log(`Pushing ${resource.title}`);
        //         console.log(resource);
        //         if (typeof resource.output !== 'string') {
        //             resource.output = "";
        //         }
        //         const newResource = {
        //             title: resource.title,
        //             type: resource.type,
        //             output: resource.output
        //         }
        //         console.log(newResource);
        //         await Curriculum.findByIdAndUpdate(curriculumId, {$push: {'resources': {
        //             title: resource.title,
        //             type: resource.type,
        //             output: resource.output.toString()
        //         }}});
        //     } else {
        //         if (resource.type === 'file') {
        //             // Only updating file's title
        //             // console.log(resource);
                    
        //             await Curriculum.findById(curriculumId).then((curriculum) => {
        //                 curriculum.resources.forEach(async (curriculumResource, index) => {
        //                     if (curriculumResource._id.toString() === resource._id) {
        //                         // console.log(`Updating ${resource.title}`);
        //                         const update = {};
        //                         update[`resources.${index}.title`] = resource.title;
        //                         // console.log(update);
        //                         // Update Title
        //                         await Curriculum.findByIdAndUpdate(curriculumId, {
        //                             $set: update
        //                         });
        //                     }
        //                 })
        //             })

    
        //         } else if (resource.type === 'link') {
        //             console.log(resource);

        //             await Curriculum.findById(curriculumId).then((curriculum) => {
        //                 curriculum.resources.forEach(async (curriculumResource, index) => {
        //                     if (curriculumResource._id.toString() === resource._id) {
        //                         console.log(`Updating ${resource.title}`);
        //                         const update = {};

        //                         // Update Title
        //                         update[`resources.${index}.title`] = resource.title;
        //                         await Curriculum.findByIdAndUpdate(curriculumId, {
        //                             $set: update
        //                         });
        //                         console.log(update);
        //                         // Update Link
        //                         update[`resources.${index}.output`] = resource.output;
        //                         await Curriculum.findByIdAndUpdate(curriculumId, {
        //                             $set: update
        //                         });
        //                         console.log(update);
        //                     }
        //                 });
        //             });
    
        //         } else {
        //             console.log('Something went wrong');
        //         }
        //     }


        // });
        // res.status(200).send('Updated');

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