let {PythonShell} = require('python-shell');
class Model{
    constructor() {
    }

    async predict(modelInfoPath,model,dataFilePath,resultFile){
        return new Promise(async (resolve, reject) => {
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: '',//Path to your script
                args: [model,dataFilePath,resultFile]
            };
            PythonShell.run(modelInfoPath, options, (error, result) => {
                if (error) reject(error);
                else resolve(result);
            });
        });
    }
    async getresult(answerFile,resultFile){
        return new Promise(async (resolve, reject) => {
            const students_per_section = 40                 // Need user input for number of sections
            let options = {
                mode: 'text',
                pythonOptions: ['-u'],
                scriptPath: '',//Path to your script
                args: [resultFile,students_per_section]
            };
            PythonShell.run(answerFile,options, function (error, result) {
                if(error)reject(error);
                else resolve();
            });
        });
    }
}
module.exports = new Model();