import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", `/jobs`, params, resolve, reject);
  },
  getCompanyJobs(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/jobs/${companyId}/all`, params, resolve, reject);
  },
  get(params, resolve, reject = null) {
    return request(
      "get",
      `/jobs/${params.companyId}/${params.id}`,
      resolve,
      reject
    );
  },
  create(params, resolve, reject = null) {
    return request(
      "post",
      `/jobs/${params.companyId}`,
      params,
      resolve,
      reject
    );
  },
  update(params, resolve, reject = null) {
    return request(
      "patch",
      `/jobs/${params.companyId}/${params._id}`,
      params,
      resolve,
      reject
    );
  },
  delete(params, resolve, reject = null) {
    return request(
      "delete",
      `/jobs/${params.companyId}/${params._id}`,
      resolve,
      reject
    );
  },
  upload(params, resolve, reject = null) {
    return request("post", `/jobs/attachment/upload`, params, resolve, reject);
  },
  addAttachment(params, resolve, reject = null) {
    return request(
      "patch",
      `/jobs/${params.companyId}/${params._id}/attachment`,
      params,
      resolve,
      reject
    );
  },
  downloadAttachment(params, resolve, reject = null) {
    return request(
      "get",
      `/jobs/${params.companyId}/${params.id}/attachment/${params.attachmentId}/download`,
      params,
      resolve,
      reject
    );
  },
  deleteAttachment(params, resolve, reject = null) {
    return request(
      "delete",
      `/jobs/${params.companyId}/${params._id}/attachment/${params.attachmentId}`,
      resolve,
      reject
    );
  }
};
