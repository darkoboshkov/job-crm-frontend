import request from "../request";

export default {
  get(params, config = {}) {
    return request(
      "get",
      `/profile/${params.companyId}/${params.id}`,
      {},
      config
    );
  },
  getDetail(params, config = {}) {
    return request(
      "get",
      `/profile/${params.companyId}/${params.id}/edit`,
      {},
      config
    );
  },
  patchById(params, config = {}) {
    const id = params.id;
    const companyId = params.companyId;
    delete params.id;
    delete params.companyId;
    return request("patch", `/profile/${companyId}/${id}`, params, config);
  },
  patch(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("patch", `/profile/${companyId}`, params, config);
  },
  uploadImage(params, config = {}) {
    return request("post", "/profile/image-upload", params, config);
  },
  uploadID(params, config = {}) {
    return request("post", "/profile/id-upload", params, config);
  },
  downloadID(params, config = {}) {
    const companyId = params.companyId;
    const id = params.userId;
    return request(
      "post",
      `/profile/${companyId}/${id}/id-download`,
      {},
      {
        responseType: "blob"
      }
    );
  }
};
