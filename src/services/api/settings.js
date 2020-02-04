import request from "../request";

export default {
  get(params, resolve, reject = null) {
    return request("get", "/settings", params, resolve, reject);
  },
  patch(params, resolve, reject = null) {
    return request(
      "patch",
      "/settings/" + params.role,
      params,
      resolve,
      reject
    );
  }
};
