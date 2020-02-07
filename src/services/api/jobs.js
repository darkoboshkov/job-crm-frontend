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
  }
};
