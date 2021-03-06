const express = require('express');
const router = express.Router();
const User = require('./model').User;
const createTokenAdmin = require('../../helper/token').createTokenAdmin;
const passport = require('passport');
router.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body.name, req.body.email, req.body.password,true);
        await user.save();
        res.status(200).send({
            'result': 'success'
        });
    } catch (error) {
        res.status(400).send({
            'result': 'error'
        });
    }
});

router.post('/signin', (req, res,next) => {
    passport.authenticate("local", async (error, user) => {
        if (error)
            res.status(400).send({
                'result': error
            });
        else {
            const _token = createTokenAdmin(req.body.email);
            res.status(200).send({
                'result': {email:user._email,name:user._name,token:_token}
            });
        }
    })(req, res,next);
});

module.exports = router;