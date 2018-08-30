
import Router from "koa-router";
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

import usermongo from './config.js';
import { User, Groups, Share } from './model.js';


const router = new Router();

const secret = 'jwt_secret';

router.post('/register', async (ctx) => {
    var fields = ctx.request.body;
    var register = JSON.parse(fields);
    const {userName, password, repassword, email, invite} = register;
    let result = await User.find({username: userName});
    if(result.length > 0) {
      ctx.body = {
        message: "用户名已注册",
      };
      ctx.status = 401;
    } else {

        let hexpassword = crypto.createHash('sha1').update(password).digest("hex");
        let hexrepassword = crypto.createHash('sha1').update(repassword).digest("hex");

        if(hexpassword === hexrepassword) {
          let result = await User({
            uid: 1123546,
            username: userName,
            userpassword: hexrepassword,
            createTime: new Date(),
            lastLogin: null,
            email: email,
            invite: invite
          }).save();
         ctx.body = {
          message: "注册成功",
        };
        ctx.status = 200;

      } else {
        ctx.body = {
          message: "两次密码不正确",
        };
        ctx.status = 401;
      }
    }
});

//登录请求验证
router.post('/login', async (ctx, next) => {

    var fields = ctx.request.body;
    var login = JSON.parse(fields);
    const {userName, password, remember} = login;

    // 做加密处理 /
    let shasum = crypto.createHash('sha1');
    shasum.update(password);
    var hexpassword = shasum.digest('hex');

    let ret = await User.find({ username: userName });
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
      console.log(error);
        ctx.throw(500);

    }
});

export default router;
