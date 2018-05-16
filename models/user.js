var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
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
            paid: {type:Number, default:0},
            item: { type:Schema.Types.ObjectId, ref:'Product'}
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
return bcrypt.compareSync(password,this.password);
}

UserSchema.methods.gravatar = (size)=>{
if (this.size) size = 200;
if(!this.email) return 'http://gravatar.com/avatar/?s' + size + '&d=retro';
var md5 = crypto.createHash('md5').update(this.email).digest('hex');
return 'http://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
}

module.exports = mongoose.model('User',UserSchema);