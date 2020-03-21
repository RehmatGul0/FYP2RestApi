const algorithm = require('../algorithm/model').Algorithm;
const modelInfoDAO = require('./dao').ModelInfoDAO;


module.exports.ModelInfo = class ModelInfo {
    constructor(modelFilePath, dataFilePath,algorithmId,features, model) {
            this.modelFilePath = modelFilePath,
            this.dataFilePath = dataFilePath,
            this.algorithmId = algorithmId,
            this.features = JSON.parse(features),
            this.model = model;
    }

    async save() {
        return new Promise(async (resolve, reject) => {
            try{
                resolve(await modelInfoDAO.add(this));
           }
           catch(error){
               reject(error);
           }
        });
    }

    async validate(algorithmId) {
        return new Promise(async (resolve, reject) => {
            if (algorithmId === undefined || algorithmId === null) reject('Invalid input')
            try {
                await algorithm.getById(algorithmId);
                resolve();
            } catch (error) {
                reject('Invalid input')
            }
        });
    }

    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            let modelInfo = await modelInfoDAO.getById(id);
            if(!modelInfo) reject('No document found')
            else resolve(modelInfo);
        });
    }

    static async get() {
        return await modelInfoDAO.get();
    }
}