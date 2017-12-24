import mongoose from 'mongoose';



var UserSchema = new mongoose.Schema({
    uid: Number,
    username: String,
    userpassword:String,
    createTime: Date,
    lastLogin: Date
});

module.exports = mongoose.model('User', UserSchema);

















