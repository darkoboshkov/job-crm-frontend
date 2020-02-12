import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "constants/all", resolve, reject);
  }
};
