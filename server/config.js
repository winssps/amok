import mongoose from 'mongoose';
import co from 'co';




const connstring = 'mongodb://localhost:27017/koas';
mongoose.connect(connstring);









/*
co(function* () {
    ret = yield new usermodel(newUser).save();
   console.log("hello config.js" + ret);
});

*/


module.exports = mongoose;










