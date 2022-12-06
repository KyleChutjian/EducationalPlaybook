const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
    name: {type: String, required: true},
    lessons: { type: mongoose.Schema.Types.Mixed, required: true},
    objectives: {type: [String], required: true}
});

module.exports = mongoose.model("Curriculum", curriculumSchema);