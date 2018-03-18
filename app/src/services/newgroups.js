import request from '../utils/request';


export function patch(params) {
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