import request from "../request";

export default {
  get(params, config = {}) {
    return request("get", "/settings", {}, config);
  },
  patch(params, config = {}) {
    return request("patch", `/settings/${params.role}`, params, config);
  },
  uploadImage(params, config = {}) {
    return request("post", "/settings/image-upload", params, config);
  },
  resetPassword(params, config = {}) {
    return request("post", "/settings/change-password", params, config);
  },
  uploadID(params, config = {}) {
    return request("post", "/settings/id-upload", params, config);
  },
  downloadID(params, config = {}) {
    return request(
      "post",
      `/settings/id-download`,
      {},
      {
        responseType: "blob"
      }
    );
  }
};
