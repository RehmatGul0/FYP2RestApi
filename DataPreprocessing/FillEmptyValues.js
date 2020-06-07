let {PythonShell} = require('python-shell')
exports.FillEmptyValues= class FillEmptyValues{
	preprocess(dataFile) {
		return new Promise(async (resolve, reject) => {
            try {
				let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
				args: [dataFile]
				};
				PythonShell.run('FillEmptyValues.py', options, (error, result) => {
					if (error) reject(error);
					else resolve();
				});
			}
			catch(error){reject(error);}
		});   
    }
}
