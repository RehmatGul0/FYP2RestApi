const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    _question : { type :String, required :true },
    _answerPath : { type :String, required :true }, 
    _domain : { type : mongoose.Types.ObjectId , ref : 'Domain' , required : true},
    _modelInfo : { type : mongoose.Types.ObjectId , ref : 'ModelInfo' , required : true},
    _algorithm : { type : mongoose.Types.ObjectId , ref : 'Algorithm' , required : true},

});
module.exports.Question = mongoose.model('Question',questionSchema);
