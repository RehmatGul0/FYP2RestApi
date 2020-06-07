let {PythonShell} = require('python-shell')
exports.ScaleDataset= class ScaleDataset{
	preprocess(dataFile) {
		return new Promise(async (resolve, reject) => {
            try {
				let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
				args: [dataFile]
				};
				PythonShell.run('ScaleDataset.py', options, (error, result) => {
					if (error) reject(error);
					else resolve();
				});
			}
			catch(error){reject(error);}
		});   
    }
}