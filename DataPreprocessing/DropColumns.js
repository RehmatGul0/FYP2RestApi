let {PythonShell} = require('python-shell')
 class DropColumns{
	preprocess(dataFile,features) {
		return new Promise(async (resolve, reject) => {
            try {
				let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
				args: [dataFile,features]
				};
				PythonShell.run('DropColumns.py', options, (error, result) => {
                    if (error) reject(error);
                    else if(result[0]==='500')reject('Features not present')
					else resolve();
				});
			}
			catch(error){reject(error);}
		});   
    }
}
exports.dropColumns= new DropColumns();