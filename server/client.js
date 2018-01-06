import Koa from 'koa';
import Router from "koa-router";
import co from "co";
import oss from "ali-oss";
import views from 'koa-views';
import path from 'path';
import koaBetterBody from 'koa-better-body';
import crypto from 'crypto';
import session from 'koa-session';
//import mongoose from 'mongoose';


import usermongo from './config.js';
import usermodel from './model.js';


const app = new Koa();
const router = new Router();





app.use(koaBetterBody());
app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
    extension: 'html'
}));

app.keys = ['im a newer secret', 'i like turtle'];
app.use(session({
    key: "SESSIONID",   //default "koa:sess"
    maxAge: 60 * 1000 * 30  //设置session超时时间
},app));


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

//首页
router.get('/',async (ctx, next) => {
   await ctx.render('index.html');
});


router.post('/login',async (ctx,next) => {
  //  console.log(ctx.request.fields);

    var fields = ctx.request.fields;
    var username = fields.user;
    var password = fields.password;

    /* 做加密处理 */
    let shasum = crypto.createHash('sha1');
    shasum.update(password);
    password = shasum.digest('hex');
    let ret;
    await co(function *() {
        ret = yield usermodel.find({ username: username });
    });
    if(ret.length > 0) { //有结果表示有相应的用户
        if (ret[0].userpassword == password) {
            if (ctx.session.view === undefined) {
                ctx.session.view = ret[0].username;
            }else {
                ctx.session.view = ret[0].username;
            }
            ctx.body = true;
        } else { //用户名密码不正确
            ctx.session.view = null;
            ctx.body = false;
        }
    } else { //用户名密码不正确
        ctx.session.view = null;
        ctx.body = false;
    }
    console.log('view', ctx.session.view) //log 输出
});

router.post('/upload', async (ctx, next) => {
 
    // console.log(ctx.request.body)    // if buffer or text
    // console.log(ctx.request.files)   // if multipart or urlencoded
    // console.log(ctx.request.fields)  // if json

    if(ctx.request.files) {
        let file = ctx.request.files[0];// if multipart or urlencoded
        let filepath = file.path;
        let filename = file.name;

        co(function* () {
            client.useBucket('testclass');
            result = yield client.put('hello/' + filename, filepath);
      //      console.log(result);
        }).catch(function (err) {
            console.log(err);
        });
        ctx.body = 200; 
    } else {
        ctx.body = 404;
    }
});
//print the Buckets list
router.get('/bucket', (ctx, next) => {
    co(function* (){
        result = yield client.listBuckets();
        //  console.log(result);
    }).catch(function (err) {
        console.log(err);
    });
    ctx.body = result;
});



// print the files list of Bucket
router.get('/files', async (ctx, next) => {

    await co(function* () {
    client.useBucket('testclass');
    result = yield client.list({
            'max-keys': 100,
            'prefix' : 'thesis/'
        });
    }).catch(function (err) {
        console.log(err);
    });
    ctx.body = result;
});

app.listen(4535,"127.0.0.1", () => {
    console.log('listening to  http://localhost:4535');
});

module.exports = app;



