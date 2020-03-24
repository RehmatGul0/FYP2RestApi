const express = require('express');
const router = express.Router();
const adminCheck = require('../../middleware/adminCheck').checkAdmin;
const ModelInfo  = require('./model').ModelInfo;
const dataPreprocess =require('../../DataPreprocessing/DataPreprocess');
const algorithm = require('../algorithm/model').Algorithm;
const model = require('../../MachineLearning/ClusteringModel');
const upload = require('../../multer/storage').uploadAdmin.fields([{
    name: 'dataFile', maxCount: 1
}, {
    name: 'modelFile', maxCount: 1
}]);

//router.use(adminCheck);
router.post('/add' ,upload, async (req, res) => {
    try {
        await dataPreprocess.processData(req.files['dataFile'][0].path);
        let algorithmInfo = await algorithm.getById(req.body.algorithmId);
        let modelState = await model.cluster(algorithmInfo,req.files['dataFile'][0].path);
        const modelInfo = new ModelInfo(req.files['modelFile'][0].path,req.files['dataFile'][0].path, req.body.algorithmId,
            req.body.features,modelState);

        await modelInfo.validate(req.body.algorithmId);
        await modelInfo.save();

        res.status(200).send({
            'result': 'success'
        });
    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            'result': 'error'
        });
    }
});

router.get('/get', async (req, res,next) => {
    try{
        let modelInfo = await ModelInfo.get();
        res.status(200).send({
            'result': modelInfo
        });
    }
    catch(error){
        res.status(400).send({
            'result': error
        });
    }
});

module.exports = router;