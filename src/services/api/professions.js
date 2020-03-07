import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", `/professions/all`, params, resolve, reject);
  }
};
