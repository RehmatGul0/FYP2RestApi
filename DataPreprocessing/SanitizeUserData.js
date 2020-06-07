let {PythonShell} = require('python-shell')
SanitizeUserData= class SanitizeUserData{
	preprocess(dataFile,features) {
		return new Promise(async (resolve, reject) => {
            try {
                let columns = JSON.stringify(Object.values(JSON.parse(features)));
				let options = {
				mode: 'text',
				pythonOptions: ['-u'],
				scriptPath: 'DataPreprocessing/HelperScripts',//Path to your script
				args: [dataFile,features,columns]
				};
				PythonShell.run('SanitizeUserData.py', options, (error, result) => {
					console.log(error);
					console.log(result);
					
					if (error) reject(error);
					else if(result[0]==='500')reject('Features not present')
					else resolve();
				});
			}
			catch(error){reject(error);}
		});   
    }
}
exports.sanitizeUserData = new SanitizeUserData();