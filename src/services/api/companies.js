import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", `/companies/all`, resolve, reject);
  },
  get(params, resolve, reject = null) {
    return request("get", `/companies`, params, resolve, reject);
  },
  create(params, resolve, reject = null) {
    return request("post", `/companies`, params, resolve, reject);
  },
  getById(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}`, params, resolve, reject);
  },
  patch(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("patch", `/companies/${companyId}`, params, resolve, reject);
  },
  delete(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request(
      "delete",
      `/companies/${companyId}`,
      params,
      resolve,
      reject
    );
  }
};
