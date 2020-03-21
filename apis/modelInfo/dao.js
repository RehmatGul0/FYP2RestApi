const _modelInfo = require('../../models/ModelInfo').ModelInfo;
class ModelInfoDAO {
    async add(modelInfo) {
        return new Promise(async (resolve, reject) => {
            _modelInfo.create({
                _modelFilePath : modelInfo.modelFilePath,
                _dataFilePath : modelInfo.dataFilePath,
                _algorithm : modelInfo.algorithmId,
                _features : modelInfo.features,
                _model : modelInfo.model
            },
            (error, doc) => {
                if (error) reject(error);
                else resolve(doc);
            })
        });
    }
    async getById(id){
        return await _modelInfo.findOne({_id: id})
        .lean()
        .populate('_algorithm');
    }
    async get(){
        return await _modelInfo.find()
        .lean()
        .populate('_algorithm');
    }
}
module.exports.ModelInfoDAO = new ModelInfoDAO();
