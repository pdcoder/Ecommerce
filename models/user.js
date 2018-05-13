var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var {Schema} = mongoose;

var UserSchema = new Schema({
    email: { type: String, unique: true, lovercase:true},
    password: String,

    profile: {
        name: {type:String, default:''},
    },

    address:String,
    history:[
        {
            date: Date,
            paid: {type:Number, default:}
        }
    ]
});

UserSchema.pre('save',(next)=>{
    var user = this;
    if(!user.isModified('password'))
    return next();
    bcrypt.genSalt(10,(err,salt)=>{
        if (err) return next(err);
        bcrypt.hash(user.password,salt,null,(err,hash)=>{
            if (err) return next(err);
user.password= hash;
next();
        });
    });
});


/*Compare password*/
UserSchema.methods.comparePassword = (password)=>
{
return bcrypt.compareSync(password,hash.password);
}

module.exports = mongoose.model('User',UserSchema);