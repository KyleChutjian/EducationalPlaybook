const mongoose = require("mongoose");

const intakeFormSchema = new mongoose.Schema({
    clientId: {type: User[], required: true},
    programLeadId: {type: User[], required: true},
    curriculumId: {type: Curriculum[], required: true},
    intakeResponse: {type: String[], required: true},
    status: {type: String, required: true},
    needsAssessment: {type: String[][], required: true}
});

module.exports = mongoose.model("IntakeForm", userSchema);
