let {PythonShell} = require('python-shell');
class Model{
    constructor() {
    }

    async cluster(algorithmInfo,dataFile){
        return new Promise(async (resolve, reject) => {
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: 'Algorithms',//Path to your script
                args: [dataFile]
            };
            PythonShell.run(algorithmInfo._path, options, (error, result) => {
                if (error) reject(error);
                else resolve(result[0]);
            });
        });
    }
}
module.exports = new Model();