const mongoose = require('mongoose');

const domainSchema = mongoose.Schema({
    _name : { type :String, required :true , unique :true }
});

module.exports.Domain = mongoose.model('Domain',domainSchema);