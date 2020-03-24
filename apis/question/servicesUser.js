const express = require('express');
const router = express.Router();
const Question = require('./model').Question;
const userCheck = require('../../middleware/userCheck').checkUser;
const userData = require('../../multer/storage').uploadUserData.single('dataFile');
const User = require('../user/model').User;
// //router.use(userCheck);
router.post('/getAnswer',userCheck,async (req,res)=>{
    try {
         let resultFile = await Question.getAnswer(req.body.questionId,req.body.path);
         console.log(resultFile)
         res.status(200).sendfile(resultFile);
    } catch (error) {
         res.status(400).send({
             'result': 'Error Fetching File'
         });
    }
})
router.get('/get', async (req, res) => {
    try {
        let questions = await Question.get();
        res.status(200).send({
            'result': questions
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});


module.exports = router;