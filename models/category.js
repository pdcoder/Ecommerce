var mongoose = require('mongoose');
var {Schema} = mongoose;

var CategotySchema = new Schema({
    name: {type:String, unique:true,lowercase:true}
});


module.exports = mongoose.model('Category',CategotySchema);