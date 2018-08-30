import mongoose from 'mongoose';
import co from 'co';
import oss from "ali-oss";

const connstring = 'mongodb://localhost:27017/koas';
mongoose.connect(connstring);

export const client = new oss({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI1Ho5kH1Q6TXs',
    accessKeySecret: 'UJFrl1Ya7fd0Oh57GMVd1vfKfX9JLu'
});

export const secret = 'jwt_secret';

export const unlessArr = [/^\/user/, /^\/groups/, /^\/files/, /^\/upload/, /^\/sharegroups/];




export default mongoose;
