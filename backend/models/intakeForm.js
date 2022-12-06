const mongoose = require("mongoose");

const intakeFormSchema = new mongoose.Schema({
    clientId: {type: mongoose.Schema.Types.ObjectId, required: true},
    programLeadId: {type: mongoose.Schema.Types.ObjectId, required: true},
    curriculumId: {type: mongoose.Schema.Types.ObjectId, required: true},
    intakeResponse: {type: [String], required: true},
    status: {type: String, required: true},
    needsAssessment: {type: mongoose.Schema.Types.Mixed, required: true} // might need to be changed
});

module.exports = mongoose.model("IntakeForm", intakeFormSchema);