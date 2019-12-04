import request from '../responseCacheRequest';

export default {

    login(params, resolve, reject = null) {
        return request('post', '/auth/login', params, resolve, reject);
    },
    signup(params, resolve, reject = null) {
        return request('post', '/auth/register', params, resolve, reject);
    },
}