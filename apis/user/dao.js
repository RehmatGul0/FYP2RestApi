const _user = require('../../models/User').User;
class UserDAO {
    async add(user,hash) {
        return new Promise(async (resolve, reject) => {
            _user.create({
                    _name: user.name,
                    _email: user.email,
                    _password: hash,
                    _isAdmin: user.isAdmin
                },
                (error, doc) => {
                    if (error) reject(error);
                    else resolve(doc);
                }
            )
        });
    }
    async getByEmail(email){
        return await _user.findOne({_email: email}).lean();
    }
    async getById(id){
        return await _user.findOne({_id: id}).lean();
    }
    async addFileInfo(userId,questionId,filePath){
        return new Promise(async (resolve, reject) => {
            let dataFile = {'_path':filePath,'_question':questionId};
            _user.findByIdAndUpdate(userId,{$push: {_dataFiles: dataFile}}, {useFindAndModify: false},(error,result)=>{
                if(error)reject(error);
                else resolve();
            })
        });
    }
}
module.exports.UserDAO = new UserDAO();