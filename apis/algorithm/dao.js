const _algorithm = require('../../models/Algorithm').Algorithm;
class AlgorithmDAO {
    async add(algorithm) {
        return new Promise(async (resolve, reject) => {
            _algorithm.create({
                    _name: algorithm.name,
                    _path:algorithm.path
                },
                (error, doc) => {
                    if (error) reject(error);
                    else resolve(doc);
                }
            )
        });
    }
    async getById(id){
        return await _algorithm.findOne({_id: id}).lean();
    }
    async get(){
        return await _algorithm.find().lean();
    }
    async getByName(name){
        return await _algorithm.findOne({_name: name}).lean();
    }
}
module.exports.AlgorithmDAO = new AlgorithmDAO();
