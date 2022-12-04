const mongoose = require("mongoose");

const intakeFormSchema = new mongoose.Schema({
    clientId: {type: Object, required: true},
    programLeadId: {type: Object, required: true},
    curriculumId: {type: Object, required: true},
    intakeResponse: {type: String[], required: true},
    status: {type: String, required: true},
    needsAssessment: {type: String[][], required: true}
});

module.exports = mongoose.model("IntakeForm", userSchema);
