const mongoose = require('mongoose');
const  dataFiles = new mongoose.Schema({
    _path : { type :String, required :true },
    _question : { type :mongoose.Types.ObjectId , required :true }
});
const userSchema = mongoose.Schema({
    _name : { type :String, required :true },
    _email : { type : String , unique: true },
    _password : { type :String, required :true },
    _isAdmin : { type :String, default :false },
    _dataFiles : [dataFiles]
    
});

userSchema.index({_email:1});
module.exports.User = mongoose.model('User',userSchema);
