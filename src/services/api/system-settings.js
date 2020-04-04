import request from "../request";

export default {
  get(params, config = {}) {
    return request("get", "/settings", params, config);
  },
  patch(params, config = {}) {
    return request("patch", `/settings/${params.role}`, params, config);
  }
};
