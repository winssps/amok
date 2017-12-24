import mongoose from 'mongoose';
import co from 'co';

import usermodel from './model.js';




const connstring = 'mongodb://localhost:27017/koas';
mongoose.connect(connstring);


let newUser = {
    uid: 51651,
    username: "winssps",
    userpassword: "winssps1144",
    createTime: new Date(),
    lastLogin: null
};



/*
co(function* () {
    ret = yield new usermodel(newUser).save();
   console.log("hello config.js" + ret);
});

*/

module.exports = newUser;











