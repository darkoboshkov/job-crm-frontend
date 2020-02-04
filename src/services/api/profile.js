import request from "../request";

export default {
  get(params, resolve, reject = null) {
    return request("get", "/profile", params, resolve, reject);
  },
  patch(params, resolve, reject = null) {
    return request("patch", "/profile/" + params.role, params, resolve, reject);
  }
};
