import Koa from 'koa';
import Router from "koa-router";
import co from "co";
import oss from "ali-oss";
import views from 'koa-views';
import path from 'path';
import koaBetterBody from 'koa-better-body';


import usermongo from './config.js';


const app = new Koa();
const router = new Router();

app.use(koaBetterBody());
app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
    extension: 'html'
}));

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


app.use(async (ctx, next) => {
    console.log("hello mongodb!");
    await next();
    console.log(usermongo); 
});

var result;

//首页
router.get('/',async (ctx, next) => {
   // ctx.body = 'upload i';
   await ctx.render('index.html');
});


router.post('/login',async (ctx,next) => {
    console.log(ctx.request.fields);


    ctx.body = 200;
});


//上传页面
router.get('/upload',(ctx, next) => {
    ctx.body = 'upload i';
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
router.get('/files', (ctx, next) => {
    co(function* (){
        client.useBucket('testclass');
        result = yield client.list({
            'max-keys': 60
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



