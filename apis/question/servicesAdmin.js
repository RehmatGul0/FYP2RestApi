const express = require('express');
const router = express.Router();
const adminCheck = require('../../middleware/adminCheck').checkAdmin;
const Question = require('./model').Question;
const upload = require('../../multer/storage').uploadAnswerFile.single('answerFile');

//router.use(adminCheck);
router.post('/add',upload, async (req, res) => {
    try {
        const question = new Question(req.body.question, req.file.filename,
            req.adminEmail , req.body.domainId, req.body.modelInfoId.replace('"','').replace('"',''));
        console.log(question)
        await question.validate(req.body.domainId,req.body.modelInfoId.replace('"','').replace('"',''),);
        await question.save();

        res.status(200).send({
            'result': 'success'
        });
    } catch (error) {
        console.log(error)
        res.status(400).send({
            'result': error
        });
    }
});

router.get('/get', async (req, res,next) => {
    try{
        let questions = await Question.get();
        res.status(200).send({
            'result': questions
        });
    }
    catch(error){
        res.status(400).send({
            'result': error
        });
    }
});

module.exports = router;