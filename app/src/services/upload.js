import request from '../utils/request';


export function patch(params) {
    return request('/upload', {
        method: 'POST',
        body: JSON.stringify(params),
    });
}