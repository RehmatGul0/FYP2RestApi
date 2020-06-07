const express = require('express');
const router = express.Router();
const userCheck = require('../../middleware/userCheck').checkUser;
const userData = require('../../multer/storage').uploadUserData.single('dataFile');
const User = require('../user/model').User;
const sanitizeUserData = require('../../DataPreprocessing/SanitizeUserData').sanitizeUserData;
router.post('/upload-data',userCheck,userData, async (req, res) => {
    try {
        await sanitizeUserData.preprocess(req.file.path,req.body.featureMapping);

        await User.addFileInfo(req.userId,req.body.questionId,req.file.path);
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
router.get('/get-data',userCheck, async (req, res) => {
    try {
        let user = await User.getById(req.userId);
        let userDataFile = user._dataFiles.map(dataFile=>{
            return {'file':dataFile._path.split('\\')[2],'_id':dataFile._id,'_questionId':dataFile._question,'path':dataFile._path}
        })
        res.status(200).send({
            'result': userDataFile
        });
    } catch (error) {
        res.status(400).send({
            'result': error
        });
    }
});



module.exports = router;