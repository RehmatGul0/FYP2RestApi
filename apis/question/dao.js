const _question = require('../../models/Question').Question;
class QuestionDAO {
    async add(question) {
        return new Promise(async (resolve, reject) => {
            _question.create({
                _question : question.question ,
                _answerPath : question.answerPath, 
                _domain : question.domainId,
                _modelInfo : question.modelInfoId
                },
                (error, doc) => {
                    if (error) reject(error);
                    else resolve(doc);
                }
            )
        });
    }
    async getById(id){
        return await _question.findOne({_id: id})
        .lean()
        .populate('_domain')
        .populate('_modelInfo')
        .populate('_modelInfo._algorithm');
    }
    async get(){
        return await _question.find()
        .lean()
        .populate('_domain')
        .populate('_modelInfo')
        .populate('_modelInfo._algorithm');
    }
}
module.exports.QuestionDAO = new QuestionDAO();
