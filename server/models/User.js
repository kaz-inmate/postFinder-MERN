const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type:String,
        required:true,
        select: false
    }
});


userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function(plainPassword, userPassword) {
    return await bcrypt.compare(plainPassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports =  User ;