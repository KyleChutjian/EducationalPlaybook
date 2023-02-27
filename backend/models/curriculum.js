const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
    name: {type: String, required: false},
    steps: { type: mongoose.Schema.Types.Mixed, required: true},
    objectives: {type: mongoose.Schema.Types.Mixed, required: true},
    resources: {type: mongoose.Schema.Types.Mixed, required: false}
});

module.exports = mongoose.model("Curriculum", curriculumSchema);