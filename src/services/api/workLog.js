import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "/worklogs/all", params, resolve, reject);
  },
  getByCompany(params, resolve, reject = null) {
    return request(
      "get",
      `/worklogs/${params.companyId}/all`,
      params,
      resolve,
      reject
    );
  },
  getByWorker(params, resolve, reject = null) {
    return request(
      "get",
      `/worklogs/${params.companyId}/worker`,
      params,
      resolve,
      reject
    );
  },
  approve(params, resolve, reject = null) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/approve`,
      params,
      resolve,
      reject
    );
  },
  decline(params, resolve, reject = null) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/decline`,
      params,
      resolve,
      reject
    );
  },
  save(params, resolve, reject = null) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/save`,
      params,
      resolve,
      reject
    );
  },
  send(params, resolve, reject = null) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/submit`,
      params,
      resolve,
      reject
    );
  },
  adjust(params, resolve, reject = null) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/adjust`,
      params,
      resolve,
      reject
    );
  },
  delete(params, resolve, reject = null) {
    return request(
      "delete",
      `/worklogs/${params.companyId}/${params._id}/${params.type}`
    );
  }
};
