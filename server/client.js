import Koa from 'koa';
import Router from "koa-router";
import views from 'koa-views';
import path from 'path';
import koaBetterBody from 'koa-better-body';
import crypto from 'crypto';
import jwt from 'koa-jwt';
import cors from 'koa2-cors';

import moment from 'moment';

import {client, secret, unlessArr} from './config.js';
import { User, Groups, Share } from './model.js';
import errorHandle from './errorHandle.js';
import userRouter from './userRouter.js';

const app = new Koa();
const router = new Router();

app.use(koaBetterBody());
app.use(cors());  //cors跨域 中间件


app.use(require('koa-static')(path.join(__dirname, '../build')));
app.use(views(path.join(__dirname, '../views'), {
    extension: 'html'
}));


app.use(jwt({secret,}).unless({path: unlessArr}));


app.use(errorHandle);

app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});


router.use('/user', userRouter.routes(), userRouter.allowedMethods());  //用户相关的路由



app.use(router.routes());
app.use(router.allowedMethods());

//上传文件的请求：所上传的路径
router.post('/upload', async (ctx, next) => {

    // console.log(ctx.request.body)    // if buffer or text
    // console.log(ctx.request.files)   // if multipart or urlencoded
    // console.log(ctx.request.fields)  // if json
  //  console.log(ctx.request.fields);
    let  groupsid = ctx.request.query.id;
    let sharename = ctx.request.query.share;
    let groupsname;
    let dbsubmits;
    let shareret;
    sharename = "http://localhost:8000/#/share/" + sharename;

    shareret = await Share.find({ sharelink: sharename });

    let ret = await Groups.find({ _id: groupsid });
     groupsname = ret[0].name;

    if(ctx.request.files) {
        let file = ctx.request.files[0];// if multipart or urlencoded
        let filepath = file.path;
        let filename = file.name;

        client.useBucket('testclass');
        result = await client.put(shareret[0].username + '/' + groupsname + "/" + filename, filepath)
        .catch(function (err) {
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
    const {name, date, time, attribute} = newgroups;
    let dbgroups = {
        src: name + "/",  //分组路径名称
        name: name,  //名称
        time: date,   //截止时间
        submits: 0,   //提交人数
        attribute: attribute,  //归属账户
        type: 1,   //是否激活
    }
    let ret = await Groups.find({ name: dbgroups.name });
    if (ret.length > 0 ) {
        ctx.status = 401;
        ctx.body = {
            message: '新建分组不成功，已存在相同名称',
        }
    } else {
        ret = await new Groups(dbgroups).save();
        ctx.status = 200;
        ctx.body = {
            message: '新建分组成功',
        }
    }

});

//获取提交作业的分组
router.get('/groups', async (ctx, next) => {
    let username = ctx.request.query.name; //获取分享链接后缀
    let newdata = [];
    let ret = await Groups.find({attribute: username, type: 1});
      if(ret) {
        for (let index = 0; index < ret.length; index++) {
            client.useBucket('testclass');
            let result = await client.list({
                    'max-keys': 100,
                    'prefix': username + '/' + ret[index].name + '/'
                });
            if(result.objects != undefined) {          //更新submits
                await Groups.update({ name: ret[index].name },
                { $set: { 'submits': result.objects.length}});
            }

        const time = new moment(ret[index].time).format('YYYY-MM-DD HH:mm');
        let newobj = {
            _id: ret[index]._id,
            src: ret[index].src,  //分组路径名称
            name: ret[index].name,  //名称
            time: time,   //截止时间
            submits: ret[index].submits   //提交人数
        }
        newdata.push(newobj);
      }
    }
    ctx.status = 200;
    ctx.body = newdata;
});

//获取已经删除的分组
router.get('/delist', async (ctx, next) => {
    let username = ctx.request.query.name; //获取分享链接后缀
    let ret = await Groups.find({attribute: username, type: 3});
    ctx.status = 200;
    ctx.body = ret;
});

//删除提交作业的分组
router.delete('/groups', async (ctx, next) => {
    let id = ctx.request.query.id;
    let ret = await Groups.find({_id: id});
    if(ret) {

        var result = await Groups.update({ _id: id}, { $set : { type: 3}});
        ctx.status = 200;
        ctx.body = {
            "message": "删除成功"
        };
    } else {
        ctx.status = 400;
        ctx.body = {
            "message": "分组不存在"
        };
    }
});


router.get('/recoverygroup', async (ctx, next) => {
    let id = ctx.request.query.id; //获取分享链接后缀
    let ret = await Groups.find({_id: id, type: 3});

    if(ret) {
        var result = await Groups.update({ _id: id}, { $set : { type: 1}});
    }
    ctx.status = 200;
    ctx.body = {
        "message": "恢复成功"
    }
});



// print the files list of Bucket   prefix 是路径
router.get('/files', async (ctx, next) => {

    let id = ctx.request.query.id;
    let ret = await Groups.find({ _id: id});
      client.useBucket('testclass');
    let result = await client.list({
          'max-keys': 100,
          'prefix': 'winssps/' + ret[0].name
      });
    ctx.status = 200;
    ctx.body = result;
});

router.get('/download', async (ctx, next) => {
    let id = ctx.request.query.id;
    let ret = await Groups.find({
            _id: id
        });
    client.useBucket('testclass');
    let result = await client.list({
        'max-keys': 100,
        'prefix': 'winssps/' + ret[0].name
    }).catch(function (err) {
        console.log(err);
    });
    let strlength = 8 + ret[0].name.length;
    const localscr = '/Users/wins/Desktop/test1/';
    result.objects.forEach( async element => {
        let result = await client.get(element.name,
        localscr + element.name.substring(strlength)).catch(function (err) {
            console.log(err);
        });
    });
    ctx.status = 200;
    ctx.body = {
        message: "下载完成"
    };
});

router.get('/showshare', async (ctx, next) => {

    let name = ctx.request.query.name;
    let ret;
    let sharelink;
        ret = await User.find({ username: name });
        if (ret.length > 0) { //有结果表示有相应的用户
            let useremail = ret[0].email;
            let hexstr = useremail ;
            let shasum = crypto.createHash('sha1');
            shasum.update(hexstr);
            let hexemail = shasum.digest('hex');
            sharelink = "http://localhost:8000/#/share/" + hexemail;

            ret = await Share.find({ username: name });
            if(ret.length > 0) {
                console.log("已经存在了");
            } else {
                ret =  await new Share({
                    username: name,
                    sharelink: sharelink
                }).save();
            }
        }

    ctx.body = {
        "sharelink" : sharelink,
        status: 200
    };
});

//获取提交作业的分组
router.get('/sharegroups', async (ctx, next) => {

    let sharename = ctx.request.query.share; //获取分享链接后缀
    sharename = "http://localhost:8000/#/share/" + sharename;
    let shareret;
    let result;
    let newdata = [];
    let username;

    shareret = await Share.find({ sharelink: sharename });
    if (shareret[0]) {

            let ret = await Groups.find({ attribute: shareret[0].username, type: 1 });  //查询所有分组
            for (let index = 0; index < ret.length; index++) {//所有分组的循环
                client.useBucket('testclass');
                result = await client.list({   //刷新oss 分组里边的文件数量
                    'max-keys': 100,
                    'prefix': shareret[0].username + '/' + ret[index].name + '/'
                });
                if (result.objects != undefined) {
                    await Groups.update({ name: ret[index].name },//刷新数据库文件数量
                        { $set: { 'submits': result.objects.length } });
                }

                //刷新日期显示方式
                let time = new moment(ret[index].time).format('YYYY-MM-DD HH:mm');
                let newobj = {   //整理文件信息对象
                    _id: ret[index]._id,
                    src: ret[index].src,  //分组路径名称
                    name: ret[index].name,  //名称
                    time: time,   //截止时间
                    submits: ret[index].submits   //提交人数
                }
                newdata.push(newobj);  //对象加数组
            }
    }
    ctx.status = 200;
    ctx.body = newdata;  //数据返回前端
});




app.listen(4535, () => {
    console.log('listening to  http://localhost:4535');
});

module.exports = app;
