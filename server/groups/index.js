
import Router from "koa-router";

import { User, Groups, Share } from './model.js';
import {client} from "../config";


const router = new Router();



//假设一个用户是一个文件夹，例如我的 /winssps 用户名做文件夹根目录
router.post('/newgroups', async (ctx, next) => {
    let newgroups = JSON.parse(ctx.request.body);
    const {name, date, time, attribute} = newgroups;
    let dbgroups = {
        src: name + "/",  //分组路径名称
        name: name,  //名称
        time: date,   //截止时间
        submits: 0,   //提交人数
        attribute: attribute  //归属账户
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
    let ret = await Groups.find({attribute: username});
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

//删除提交作业的分组
router.delete('/groups', async (ctx, next) => {
    let id = ctx.request.query.id;
    let ret = await Groups.remove({_id: id});
    ret = await Groups.find({});
    ctx.status = 200;
    ctx.body = ret;
});


export default router;
