let router = require('express').Router();

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to airtel-x API'
    });
});

var candidateController = require('./candidateController');

router.route('/candidates')
    .get(candidateController.index)
    .post(candidateController.add)

router.route('/candidates/:candidate_id')
    .get(candidateController.view)
    .patch(candidateController.update)
    .put(candidateController.update)
    .delete(candidateController.delete);


module.exports = router;
