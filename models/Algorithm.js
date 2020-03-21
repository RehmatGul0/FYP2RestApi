const mongoose = require('mongoose');

const algorithmSchema = mongoose.Schema({
    _name : { type:String, required:true, unique:true },
    _path : { type:String, required:true, unique:true},
});

module.exports.Algorithm = mongoose.model('Algorithm',algorithmSchema);