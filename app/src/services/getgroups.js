import request from '../utils/request';

export function patch(params) {
  return request('http://localhost:4535/groups?name=' + params, {
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


export function sharegroups(params) {
  return request('http://localhost:4535/sharegroups?share=' + params, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}



export function delist(params) {
  return request('http://localhost:4535/delist?name=' + params, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}


export function recoveryGroup(id) {
  return request('http://localhost:4535/recoverygroup?id=' + id, {
    method: 'get',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'text/plain'
    },
    mode: 'cors',
  });
}






