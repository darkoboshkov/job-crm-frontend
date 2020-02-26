import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", `/positions/all`, params, resolve, reject);
  }
};
