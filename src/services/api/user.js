import request from '../request';

export default {

  list(params, resolve, reject = null) {
    return request('get', '/users', params, resolve, reject);
  },
}