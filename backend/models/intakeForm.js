const mongoose = require("mongoose");

const intakeFormSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    clientId: {type: mongoose.Schema.Types.ObjectId, required: true},
    projectLeadIds: {type:[mongoose.Schema.Types.ObjectId], required: false},
    curriculumId: {type: mongoose.Schema.Types.ObjectId, required: true},
    status: {type: String, required: true},
    intakeResponse: {type: [String], required: true},
    needsAssessment: {type: mongoose.Schema.Types.Mixed, required: true}
});

module.exports = mongoose.model("IntakeForm", intakeFormSchema);