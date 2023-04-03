const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
    title: {type: mongoose.Schema.Types.String, required: true},
    output: {type: mongoose.Schema.Types.String, required: false}
});

const curriculumSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: false},
    steps: { type: mongoose.Schema.Types.Mixed, required: true},
    objectives: {type: mongoose.Schema.Types.Array, required: true},
    // resources: {type: [resourceSchema], required: false},
    links: {type: [resourceSchema], required: false},
    files: {type: [resourceSchema], required: false}
});

module.exports = mongoose.model("Curriculum", curriculumSchema);