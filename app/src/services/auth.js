import request from '../utils/request';

export function login(params) {

    return request('http://localhost:4535/login', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(params),
    });
}

export function register(params) {

    return request('http://localhost:4535/register', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'text/plain'
        },
        mode: 'cors',
        body: JSON.stringify(params),
    });
}