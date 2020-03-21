const express = require('express');
const router = express.Router();
const adminCheck = require('../../middleware/adminCheck').checkAdmin;
const Domain = require('./model').Domain;

//router.use(adminCheck);
router.post('/add', async (req, res) => {
    try {
        const domain = new Domain(req.body.domainName);
        await domain.save();

        /*res.cookie('token',req.cookies['token']).status(200).send({
            'result': 'success'
        });*/
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
        let domains = await Domain.get();
        /*res.cookie('token',req.cookies['token']).status(200).send({
            'result': domains
        });*/
        res.status(200).send({
            'result': domains
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }

});

module.exports = router;