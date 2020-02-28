import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "/users", params, resolve, reject);
  },
  getAllWorkers(params, resolve, reject = null) {
    return request("get", "/users/workers", params, resolve, reject);
  },
  getAllPendingWorkers(params, resolve, reject = null) {
    return request("get", "/users/pending-workers", params, resolve, reject);
  },
  getCompanyUsers(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/users/${companyId}/all`, params, resolve, reject);
  },
  getCompanyWorkers(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request(
      "get",
      `/users/${companyId}/workers/all`,
      params,
      resolve,
      reject
    );
  },
  get(params, resolve, reject = null) {
    const companyId = params.companyId;
    const userId = params.userId;
    delete params.companyId;
    delete params.userId;
    return request(
      "get",
      `/users/${companyId}/${userId}`,
      params,
      resolve,
      reject
    );
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
  },
  assignPendingWorker(params, resolve, reject = null) {
    const id = params.id;
    delete params.id;
    return request(
      "patch",
      `/users/pending-workers/${id}/assign`,
      params,
      resolve,
      reject
    );
  },
  deletePendingWorker(params, resolve, reject = null) {
    const id = params.id;
    delete params.id;
    return request("delete", `/users/pending-workers/${id}`, resolve, reject);
  }
};
