import request from '../utils/request';


export function newgroups(params) {   //新建分组
    return request('http://localhost:4535/newgroups', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(params),
    });
}

export function getlink(params) {  //获取用户分享的链接
    return request('http://localhost:4535/showshare?name=' + params, {
        method: 'get',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors'
    });
}
