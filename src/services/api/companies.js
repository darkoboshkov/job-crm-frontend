import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/companies/all`, {}, config);
  },
  get(params, config = {}) {
    return request("get", `/companies`, params, config);
  },
  getAllowed(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}/allowed`, params, config);
  },
  getById(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}`, params, config);
  },
  getAccessCompanyById(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}/access`, params, config);
  },
  create(params, config = {}) {
    return request("post", `/companies`, params, config);
  },
  sendCompanyAccess(params, config = {}) {
    const companyId = params.companyId;
    return request("post", `/companies/${companyId}/request`, params, config);
  },
  acceptCompanyAccessById(params, config = {}) {
    const companyId = params.companyId;
    const intermediaryCompanyId = params.intermediaryCompanyId;
    const token = params.token;
    return request(
      "post",
      `/companies/${companyId}/accept/${intermediaryCompanyId}/${token}`
    );
  },
  declineCompanyAccessById(params, config = {}) {
    const companyId = params.companyId;
    const intermediaryCompanyId = params.intermediaryCompanyId;
    const token = params.token;
    return request(
      "post",
      `/companies/${companyId}/decline/${intermediaryCompanyId}/${token}`
    );
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
