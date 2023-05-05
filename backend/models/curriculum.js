const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: {type: mongoose.Schema.Types.String, required: true},
    output: {type: mongoose.Schema.Types.String, required: false}
});

const curriculumSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: false},
    plan: {
        description: {type: mongoose.Schema.Types.String, required: true},
        selectedTraining: {
            lecture: {type: mongoose.Schema.Types.Boolean, required: true},
            handsOnSkills: {type: mongoose.Schema.Types.Boolean, required: true},
            mannequinBasedSimulation: {type: mongoose.Schema.Types.Boolean, required: true},
            standardizedPatient: {type: mongoose.Schema.Types.Boolean, required: true},
            inSituTraining: {type: mongoose.Schema.Types.Boolean, required: true},
            other: {type: mongoose.Schema.Types.Boolean, required: true},
        }
    },
    objectives: {type: mongoose.Schema.Types.Array, required: true},
    links: {type: [resourceSchema], required: false},
    files: {type: [resourceSchema], required: false}
});

module.exports = mongoose.model("curriculum", curriculumSchema);