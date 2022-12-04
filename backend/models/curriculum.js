const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema({
    userId: {type: User[], required: true},
    name: {type: String, required: true},
    lesson: {type: Collection, required: true}
});

module.exports = mongoose.model("Curriculum", userSchema);
