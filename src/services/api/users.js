import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "/users", params, resolve, reject);
  },
  getCompanyUsers(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/users/${companyId}/all`, params, resolve, reject);
  },
  create(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("post", `/users/${companyId}`, params, resolve, reject);
  },
  invite(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request(
      "post",
      `/users/${companyId}/invite`,
      params,
      resolve,
      reject
    );
  },
  update(params, resolve, reject = null) {
    const companyId = params.companyId;
    const id = params.id;
    delete params.companyId;
    delete params.id;
    return request(
      "patch",
      `/users/${companyId}/${id}`,
      params,
      resolve,
      reject
    );
  },
  delete(params, resolve, reject = null) {
    const companyId = params.companyId;
    const id = params.id;
    delete params.companyId;
    delete params.id;
    return request(
      "delete",
      `/users/${companyId}/${id}`,
      params,
      resolve,
      reject
    );
  }
};
