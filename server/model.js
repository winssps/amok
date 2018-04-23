import mongoose from 'mongoose';



var UserSchema = new mongoose.Schema({
    uid: Number,  //
    username: String,
    userpassword:String,
    createTime: Date,
    lastLogin: Date,
    email: String
});



var GroupsList = new mongoose.Schema({
    src: String,  //分组路径名称
    name: String,  //名称
    time: Date,   //截止时间
    submits: Number,   //提交人数
    attribute: String
});

var ShareList = new mongoose.Schema({
    username: String,
    sharelink: String
});

module.exports.User = mongoose.model('User', UserSchema);
module.exports.Groups = mongoose.model('File', GroupsList);
module.exports.Share = mongoose.model('Share', ShareList);
















