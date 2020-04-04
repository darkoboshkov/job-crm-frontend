import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/jobs`, params, config);
  },
  getCompanyJobs(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/jobs/${companyId}/all`, params, config);
  },
  get(params, config = {}) {
    return request("get", `/jobs/${params.companyId}/${params.id}`, {}, config);
  },
  create(params, config = {}) {
    return request("post", `/jobs/${params.companyId}`, params, config);
  },
  update(params, config = {}) {
    return request(
      "patch",
      `/jobs/${params.companyId}/${params._id}`,
      params,
      config
    );
  },
  delete(params, config = {}) {
    return request(
      "delete",
      `/jobs/${params.companyId}/${params._id}`,
      {},
      config
    );
  },
  upload(params, config = {}) {
    return request("post", `/jobs/attachment/upload`, params, config);
  },
  addAttachment(params, config = {}) {
    return request(
      "patch",
      `/jobs/${params.companyId}/${params._id}/attachment`,
      params,
      config
    );
  },
  downloadAttachment(params, config = {}) {
    return request(
      "post",
      `/jobs/${params.companyId}/${params.id}/attachment/${params.attachmentId}/download`,
      {},
      {
        responseType: "blob"
      }
    );
  },
  deleteAttachment(params, config = {}) {
    return request(
      "delete",
      `/jobs/${params.companyId}/${params._id}/attachment/${params.attachmentId}`,
      {},
      config
    );
  }
};
