import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "/users", params, resolve, reject);
  },
  getCompanyUsers(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/users/${companyId}/all`, params, resolve, reject);
  }
};
