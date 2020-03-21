let {PythonShell} = require('python-shell')
class DataPreprocessing{
    dropColumns(){}
    fillEmptyValues(dataFile,callback) {
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
            args: [dataFile]
        };
        PythonShell.run('FillEmptyValues.py', options, (error, result) => {
            if (error) callback(error);
            else callback(null);
        });
    }
    removeOutliers(dataFile,callback){
        let options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
            args: [dataFile]
        };
        PythonShell.run('RemoveOutliers.py', options, (error, result) => {
            if (error) callback(error);
            else callback(null);
        });
    }
}
module.exports = new DataPreprocessing();