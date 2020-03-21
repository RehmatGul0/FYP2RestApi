const _domain = require('../../models/Domain').Domain;
class DomainDAO {
    async add(domain) {
        return new Promise(async (resolve, reject) => {
            _domain.create({
                    _name: domain.name,
                },
                (error, doc) => {
                    if (error) reject(error);
                    else resolve(doc);
                }
            )
        });
    }
    async getById(id){
        return await _domain.findOne({_id: id}).lean();
    }
    async get(){
        return await _domain.find().lean();
    }
    async getByName(name){
        return await _domain.findOne({_name: name}).lean();
    }
}
module.exports.DomainDAO = new DomainDAO();
