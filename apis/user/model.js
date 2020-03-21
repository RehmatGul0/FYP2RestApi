const bcrypt = require('bcryptjs');
const userDao = require('./dao').UserDAO;
module.exports.User = class User {
    constructor(name, email, password,isAdmin) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
            bcrypt.hash(this.password, 10, async (error, hash)=> {
                if (error) reject(error);
                try{
                    let user = await userDao.add(this,hash);
                    resolve(user);
                }
                catch(error){
                    reject('Error adding user');
                }
            });
        });
    }
    static async getByEmail(email) {
        return new Promise(async (resolve, reject) => {
            let user = await userDao.getByEmail(email);
            if(!user) reject('No document found')
            else resolve(user);
        });
    }
}