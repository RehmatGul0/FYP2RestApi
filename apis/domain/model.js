const domainDAO = require('./dao').DomainDAO;

module.exports.Domain = class Domain {
    constructor(name) {
        this.name = name;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
           try{
                resolve(await domainDAO.add(this));
           }
           catch(error){
               reject(error);
           }
        });
    }
    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            if(id===null || id==undefined) reject('Invalid input');
            let domain = await domainDAO.getById(id);
            if(!domain) reject('No document found')
            else resolve(domain);
        });
    }

    static async getByName(name) {
        return new Promise(async (resolve, reject) => {
            if(name===null || name==undefined) reject('Invalid input');

            let domain = await domainDAO.getByName(name);
            if(!domain) reject('No document found')
            else resolve(domain);
        });
    }

    static async get() {
        return await domainDAO.get();
    }
}