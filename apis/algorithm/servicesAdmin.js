const express = require('express');
const router = express.Router();
const adminCheck = require('../../middleware/adminCheck').checkAdmin;
const Algorithm = require('./model').Algorithm;
const upload = require('../../multer/storage').uploadAlgorithm.single('algorithmFile');

//router.use(adminCheck);
router.post('/add',upload, async (req, res) => {
    try {
        const algorithm = new Algorithm(req.body.name,req.file.filename);
        await algorithm.save();
        res.status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});

router.get('/get', async (req, res, next) => {
    try {
        let algorithms = await Algorithm.get();
        res.status(200).send({
            'result': algorithms
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }

});

module.exports = router;