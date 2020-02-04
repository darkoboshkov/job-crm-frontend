import request from "../request";

export default {
  login(params, resolve, reject = null) {
    return request("post", "/auth/login", params, resolve, reject);
  },
  signup(params, resolve, reject = null) {
    return request("post", "/auth/register", params, resolve, reject);
  },
  verify(params, resolve, reject = null) {
    return request("post", "/auth/verify", params, resolve, reject);
  },
  forgot(params, resolve, reject = null) {
    return request("post", "/auth/forgot", params, resolve, reject);
  },
  reset(params, resolve, reject = null) {
    return request("post", "/auth/reset", params, resolve, reject);
  }
};
