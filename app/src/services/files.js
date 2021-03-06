import request from '../utils/request';


export function patch(params) {
  return request('http://localhost:4535/files?id=' + params, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}