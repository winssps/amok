import Koa from 'koa';
import Router from "koa-router";
import co from "co";
import oss from "ali-oss";
import views from 'koa-views';
import path from 'path';
import koaBetterBody from 'koa-better-body';
import crypto from 'crypto';
import session from 'koa-session';
import jwt from 'koa-jwt';
import jsonwebtoken from 'jsonwebtoken';
import cors from 'koa2-cors';

import moment from 'moment';

import usermongo from './config.js';
import { User, Groups } from './model.js';
import errorHandle from './errorHandle.js';

const app = new Koa();
const router = new Router();

app.use(koaBetterBody());
app.use(cors());


app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
    extension: 'html'
}));


const secret = 'jwt_secret';
app.use(jwt({
    secret,
    }).unless({
        path: [/^\/login/, /^\/groups/, 
            /^\/newgroups/, /^\/files/, 
            /^\/upload/, /^\/download/],
}));

app.use(errorHandle);



app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());




var client = new oss({
    region: 'oss-cn-hangzhou',
    accessKeyId: 'LTAI1Ho5kH1Q6TXs',
    accessKeySecret: 'UJFrl1Ya7fd0Oh57GMVd1vfKfX9JLu'
});


let newUser = {
    uid: 0,
    username: "winssps",
    userpassword: "winssps1144",
    createTime: new Date(),
    lastLogin: null
};

var result;

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
} 

 //管理界面   请求修改数据 密码，昵称等
router.post('/admin', async (ctx, next) => {
    ctx.body = 200;
});

//登录请求验证
router.post('/login',async (ctx,next) => {
  //  console.log(ctx.request.fields);

    var fields = ctx.request.body;
    var login = JSON.parse(fields);
    const {userName, password, remember} = login;

    // 做加密处理 /
    let shasum = crypto.createHash('sha1');
    shasum.update(password);
    var hexpassword = shasum.digest('hex');

    let ret;
    await co(function* () {
        ret = yield User.find({
            username: userName
        });
    });
    try {
        if(ret.length > 0) { //有结果表示有相应的用户
            if (ret[0].userpassword == hexpassword) {
                ctx.status = 200;
                const token = jsonwebtoken.sign({
                        data: ret[0].username,
                        // 设置 token 过期时间
                        exp: Math.floor(Date.now() / 1000) + (60 * 10), // 60 seconds * 10 minutes = 10分钟
                    }, secret);

                ctx.body = {
                    message: '登录成功',
                    user: ret[0].username,
                    // 生成 token 返回给客户端
                    token: token,
                }
            } else { //用户名密码不正确
                ctx.status = 401;
                ctx.body = {
                    message: '密码错误',
                }
            }
        } else { //用户名密码不正确
            ctx.status = 401;
            ctx.body = {
                message: '用户名错误',
            }
            return;
        }
    } catch (error) {
        ctx.throw(500);
    }
});

//上传文件的请求：所上传的路径
router.post('/upload', async (ctx, next) => {
 
    // console.log(ctx.request.body)    // if buffer or text
    // console.log(ctx.request.files)   // if multipart or urlencoded
    // console.log(ctx.request.fields)  // if json

  //  console.log(ctx.request.fields);
    let ret;
    let dbsubmits;
    await co(function* () {
        ret = yield Groups.find({ _id: ctx.request.query.id });
    });

    if(ctx.request.files) {
        let file = ctx.request.files[0];// if multipart or urlencoded
        let filepath = file.path;
        let filename = file.name;
        await co(function* () {
            client.useBucket('testclass');
            result = yield client.put('winssps/' + ret[0].name + "/" + filename, filepath);
        }).catch(function (err) {
            console.log(err);
        });
        ctx.body = 200; 
    } else {
        ctx.body = 404;
    }
});

//假设一个用户是一个文件夹，例如我的/winssps 用户名做文件夹根目录
router.post('/newgroups', async (ctx, next) => {
    let newgroups = JSON.parse(ctx.request.body);
    const {name, date, time} = newgroups;
    let dbgroups = {
        src: name + "/",  //分组路径名称
        name: name,  //名称
        time: time,   //截止时间
        submits: 0   //提交人数
    }
    let ret;
    await co(function* () {
        ret = yield Groups.find({ name: dbgroups.name });
        //  console.log("查询出来了");
    });
    if (ret.length > 0 ) {
        ctx.status = 401; 
        ctx.body = {
            message: '新建分组不成功，已存在相同名称',
        }
    } else {
        await co(function* () {
            ret = yield new Groups(dbgroups).save();
        }); 
        ctx.status = 200; 
        ctx.body = {
            message: '新建分组成功',
        }
    }
   
});
//获取提交作业的分组
router.get('/groups', async (ctx, next) => {
    let ret;
    let result;
    let newdata = [];
    await co(function* () {
        ret = yield Groups.find({});
        for (let index = 0; index < ret.length; index++) {
            client.useBucket('testclass');
            result = yield client.list({
                    'max-keys': 100,
                    'prefix': 'winssps/' + ret[index].name + '/'
                });
            yield Groups.update({ name: ret[index].name },
                { $set: { 'submits': result.objects.length}});
        let time = new moment(ret[index].time).format('YYYY-MM-DD HH:mm');
        let newobj = {
            _id: ret[index]._id,
            src: ret[index].src,  //分组路径名称
            name: ret[index].name,  //名称
            time: time,   //截止时间
            submits: ret[index].submits   //提交人数
        }   
        newdata.push(newobj); 
    
    }
    });
    ctx.status = 200;
    ctx.body = newdata;
});

//删除提交作业的分组
router.delete('/groups', async (ctx, next) => {
    let ret;
  //  console.log(ctx.request.query);
    let id = ctx.request.query.id;
    await co(function* () {
        ret = yield Groups.remove({_id: id});
    });
    await co(function* () {
        ret = yield Groups.find({});
    });
    ctx.status = 200;
    ctx.body = ret;
});


// print the files list of Bucket   prefix 是路径
router.get('/files', async (ctx, next) => {

   // console.log(ctx.request.query);
    let id = ctx.request.query.id;
    let ret;
    console.log("分组的id：" + id);
    await co(function* () {
        ret = yield Groups.find({ _id: id});
    });
    await co(function* () {
    client.useBucket('testclass');
    result = yield client.list({
            'max-keys': 100,
            'prefix': 'winssps/' + ret[0].name
        });
    }).catch(function (err) {
        console.log(err);
    });
    ctx.status = 200;
    ctx.body = result;
});

router.get('/download', async (ctx, next) => {
    let id = ctx.request.query.id;
    let ret;
    await co(function* () {
        ret = yield Groups.find({
            _id: id
        });
    });
    await co(function* () {
        client.useBucket('testclass');
        result = yield client.list({
            'max-keys': 100,
            'prefix': 'winssps/' + ret[0].name
        });
    }).catch(function (err) {
        console.log(err);
    });
    let strlength = 8 + ret[0].name.length;
    const localscr = '/Users/wins/Desktop/test1/';
    result.objects.forEach(element => {
        co(function* () {
            let result = yield client.get(element.name, 
            localscr + element.name.substring(strlength));
        }).catch(function (err) {
            console.log(err);
        });
    });
    ctx.status = 200;
    ctx.body = {
        message: "下载完成"
    };
});

app.listen(4535, () => {
    console.log('listening to  http://localhost:4535');
});

module.exports = app;



