import request from "../request";

export default {
  get(params, config = {}) {
    return request("get", "/settings", {}, config);
  },
  patch(params, config = {}) {
    return request("patch", `/settings/${params.role}`, params, config);
  },
  uploadImage(params, config = {}) {
    return request("post", "/settings/image", params, config);
  },
  resetPassword(params, config = {}) {
    return request("post", "/settings/changePassword", params, config);
  }
};
