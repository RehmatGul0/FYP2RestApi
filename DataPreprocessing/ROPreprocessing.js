const RemoveOutliers = require('./RemoveOutliers').RemoveOutliers;
exports.ROPreprocessing = class ROPreprocessing {
	constructor(preprocessor){
		this.preprocessor=preprocessor;
		this.removeOutliers = new RemoveOutliers();
	}
	async preprocess(dataFile) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.removeOutliers.preprocess(dataFile);
				await this.preprocessor.preprocess(dataFile);
				resolve();
			} catch (error) {
				reject();
			}
		});
	}
	
}