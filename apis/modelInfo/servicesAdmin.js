const express = require('express');
const router = express.Router();
const adminCheck = require('../../middleware/adminCheck').checkAdmin;
const ModelInfo  = require('./model').ModelInfo;
const FEVPreprocessing =require('../../DataPreprocessing/FEVPreprocessing').FEVPreprocessing;
const ROPreprocessing =require('../../DataPreprocessing/ROPreprocessing').ROPreprocessing;
const ScaleDataset =require('../../DataPreprocessing/ScaleDataset').ScaleDataset;
const RemoveOutliers =require('../../DataPreprocessing/RemoveOutliers').RemoveOutliers;

const dropColumns =require('../../DataPreprocessing/DropColumns').dropColumns;

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
        await dropColumns.preprocess(req.files['dataFile'][0].path,req.body.features);
        if(req.body.domain=='Education'){
            let preprocessor = new FEVPreprocessing(new RemoveOutliers());
            await preprocessor.preprocess(req.files['dataFile'][0].path);
        }
        else if(req.body.domain=='Business'){
            let preprocessor = new FEVPreprocessing(new ROPreprocessing(new ScaleDataset()));
            await preprocessor.preprocess(req.files['dataFile'][0].path);
        }
        else throw Error("Invalid domain");
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
        console.log(error);
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