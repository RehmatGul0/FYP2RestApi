const questionDAO = require('./dao').QuestionDAO;
const domain = require('../domain/model').Domain;
const modelInfo = require('../modelInfo/model').ModelInfo;

module.exports.Question = class Question {
    constructor(question , answerPath, adminId , domainId, modelInfoId) {
        this.question = question;
        this.answerPath = answerPath;
        this.adminId = adminId;
        this.domainId = domainId;
        this.modelInfoId=modelInfoId;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
           try{
                resolve(await questionDAO.add(this));
           }
           catch(error){
               reject(error);
           }
        });
    }
    async validate(domainId,modelInfoId){
        return new Promise(async (resolve, reject) => {
            if(domainId===undefined || domainId === null || modelInfoId==undefined ||modelInfoId==null) 
                reject('Invalid input')
            try{
                let _domain = modelInfo.getById(modelInfoId);
                let _modelInfo = domain.getById(domainId);
                let  results  = [await _modelInfo , await _domain];
                resolve();
            }
            catch(error){
                console.log(error)
                reject('Invalid input')
            }
        });
    }
    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            let question = await questionDAO.getById(id);
            if(!question) reject('No document found')
            else resolve(question);
        });
    }
    static async get() {
        return await questionDAO.get();
    }
}