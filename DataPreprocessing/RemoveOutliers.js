let {PythonShell} = require('python-shell')
exports.RemoveOutliers= class RemoveOutliers{
	preprocess(dataFile) {
		return new Promise(async (resolve, reject) => {
            try {
				let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
				args: [dataFile]
				};
				PythonShell.run('RemoveOutliers.py', options, (error, result) => {
					if (error) reject(error);
					else resolve();
				});
			}
			catch(error){reject(error);}
		});   
    }
}