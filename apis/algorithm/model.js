const algorithmDAO = require('./dao').AlgorithmDAO;

module.exports.Algorithm = class Algorithm {
    constructor(name,path) {
        this.name = name;
        this.path=path;
    }
    async save() {
        return new Promise(async (resolve, reject) => {
            try {
                resolve(await algorithmDAO.add(this));
            } catch (error) {
                reject(error);
            }
        });
    }
    static async getById(id) {
        return new Promise(async (resolve, reject) => {
            if (id === null || id == undefined)reject('Invalid input');
            let algorithm = await algorithmDAO.getById(id);
            if (!algorithm) reject('No document found')
            else resolve(algorithm);
        });
    }

    static async getByName(name) {
        return new Promise(async (resolve, reject) => {
            if (name === null || name == undefined) reject('Invalid input');
            let algorithm = await algorithmDAO.getByName(name);
            if (!algorithm) reject('No document found')
            else resolve(algorithm);
        });
    }

    static async get() {
        return await algorithmDAO.get();
    }
}