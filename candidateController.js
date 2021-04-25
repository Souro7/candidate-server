Candidate = require('./candidateModel');
//For index
exports.index = function (req, res) {
    Candidate.get(function (err, candidate) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Candidate Successfully!",
            data: candidate
        });
    });
};
//For creating new candidate
exports.add = function (req, res) {
    var candidate = new Candidate();
    candidate.name = req.body.name? req.body.name: candidate.name;
    candidate.email = req.body.email;
    candidate.appointment_date = req.body.appointment_date;
    candidate.interview_transcription = req.body.interview_transcription || '';
    candidate.move_forward = req.body.move_forward || null;
//Save and check error
    candidate.save(function (err) {
        if (err)
            res.json(err);
        res.json({
            message: "New Candidate Added!",
            data: candidate
        });
    });
};
// View Candidate
exports.view = function (req, res) {
    Candidate.findById(req.params.candidate_id, function (err, candidate) {
        if (err)
            res.send(err);
        res.json({
            message: 'Candidate Details',
            data: candidate
        });
    });
};
// Update Candidate
exports.update = function (req, res) {
    Candidate.findById(req.params.candidate_id, function (err, candidate) {
        if (err)
            res.send(err);
        candidate.name = req.body.name? req.body.name: candidate.name;
        candidate.email = req.body.email;
        candidate.appointment_date = req.body.appointment_date;
        candidate.interview_transcription = req.body.interview_transcription || '';
        candidate.move_forward = req.body.move_forward || null;
//save and check errors
        candidate.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Candidate Updated Successfully",
                data: candidate
            });
        });
    });
};
// Delete Candidate
exports.delete = function (req, res) {
    Candidate.deleteOne({
        _id: req.params.candidate_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'Candidate Deleted'
        })
    })
}
