import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/companies/all`, {}, config);
  },
  get(params, config = {}) {
    return request("get", `/companies`, params, config);
  },
  create(params, config = {}) {
    return request("post", `/companies`, params, config);
  },
  getById(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}`, params, config);
  },
  getAllowed(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}/allowed`, params, config);
  },
  patch(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("patch", `/companies/${companyId}`, params, config);
  },
  delete(params, config = {}) {
    return request("delete", `/companies/${params.companyId}`, {}, config);
  },
  uploadLogo(params, config = {}) {
    return request("post", `/companies/logo/upload`, params, config);
  },
  addMember(params, config = {}) {
    const companyId = params.companyId;
    return request("post", `/companymembers/${companyId}`, params, config);
  },
  removeMember(params, config = {}) {
    const companyId = params.companyId;
    const userId = params.userId;
    return request(
      "delete",
      `/companymembers/${companyId}/${userId}`,
      params,
      config
    );
  },
  upload(params, config = {}) {
    return request("post", `/companies/attachment/upload`, params, config);
  },
  addAttachment(params, config = {}) {
    return request(
      "patch",
      `/companies/${params.companyId}/attachment`,
      params,
      config
    );
  },
  downloadAttachment(params, config = {}) {
    return request(
      "post",
      `/companies/${params.companyId}/attachment/${params.attachmentId}/download`,
      {},
      {
        responseType: "blob"
      }
    );
  },
  deleteAttachment(params, config = {}) {
    return request(
      "delete",
      `/companies/${params.companyId}/attachment/${params.attachmentId}`,
      {},
      config
    );
  }
};
