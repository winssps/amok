'use strict';

const qs = require('qs');

// 引入 mock js
const mockjs = require('mockjs');

module.exports = {
    'GET /products'(req, res) {
        const page = qs.parse(req.query);

        const data = mockjs.mock({
            'data|10': [{
                'id|+1': 1,
                name: '@cname',
                time: '两天5小时48分',
                'submit|0-60': 30,
            }]
        });

        res.json({
            success: true,
            data: data.data,
        });
    },
};