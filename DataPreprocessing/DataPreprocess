const dataPreprocessing = require('./DataPreprocessing');
class DataPreprocess{
    async processData(filepath){
        return new Promise(async (resolve, reject) => {
            dataPreprocessing.fillEmptyValues(filepath,(error)=>{
                if(!error){
                    dataPreprocessing.removeOutliers(filepath,(error=>{
                        if(!error) resolve();
                        else reject(error);
                    }));
                }
                else reject();
            });
        });
    }
}
module.exports = new DataPreprocess();