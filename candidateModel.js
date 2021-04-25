var mongoose = require('mongoose');
//schema
var candidateSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    appointment_date: {
        type: Date,
        default: Date.now()
    },
    move_forward: {
        type: Boolean,
        required: false
    },
    interview_transcription: {
        type: String,
        required: false
    },
    action_result: {
        type: String,
        required: false
    }
});
// Export Candidate Model
var Candidate = module.exports = mongoose.model('candidate', candidateSchema);
module.exports.get = function (callback, limit) {
    Candidate.find(callback).limit(limit);
}
