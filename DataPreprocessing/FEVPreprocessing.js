const FillEmptyValues = require('./FillEmptyValues').FillEmptyValues;
exports.FEVPreprocessing = class FEVPreprocessing {
	constructor(preprocessor) {
		this.preprocessor = preprocessor;
		this.fillEmptyValues = new FillEmptyValues();
	}
	preprocess(dataFile) {
		return new Promise(async (resolve, reject) => {
			try {
				await this.fillEmptyValues.preprocess(dataFile);
				await this.preprocessor.preprocess(dataFile);
				resolve();
			} catch (error) {
				reject();
			}
		});
	}

}