import request from '../utils/request';

export function patch(params) {

  return request('http://localhost:4535/groups', {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}

export function deleteGroups(params) {
  return request('http://localhost:4535/groups?id=' + params, {
    method: 'delete',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}

export function getLifeList(params) {
  return request('http://localhost:4535/files?id=' + params, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}

export function downLoad(params) {
  return request('http://localhost:4535/download?id=' + params, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}









