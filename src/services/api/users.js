import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", "/users", params, config);
  },
  getAllWorkers(params, config = {}) {
    return request("get", "/users/workers", params, config);
  },
  getAllPendingWorkers(params, config = {}) {
    return request("get", "/users/pending-workers", params, config);
  },
  getCompanyUsers(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/users/${companyId}/all`, params, config);
  },
  getCompanyWorkers(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/users/${companyId}/workers/all`, params, config);
  },
  getAvailableCompanyWorkers(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request(
      "get",
      `/users/${companyId}/available-workers/all`,
      params,
      config
    );
  },
  get(params, config = {}) {
    const companyId = params.companyId;
    const userId = params.userId;
    delete params.companyId;
    delete params.userId;
    return request("get", `/users/${companyId}/${userId}`, params, config);
  },
  create(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("post", `/users/${companyId}`, params, config);
  },
  invite(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("post", `/users/${companyId}/invite`, params, config);
  },
  update(params, config = {}) {
    const companyId = params.companyId;
    const id = params.id;
    delete params.companyId;
    delete params.id;
    return request("patch", `/users/${companyId}/${id}`, params, config);
  },
  delete(params, config = {}) {
    return request(
      "delete",
      `/users/${params.companyId}/${params.id}`,
      {},
      config
    );
  },
  assignPendingWorker(params, config = {}) {
    const id = params.id;
    delete params.id;
    return request(
      "patch",
      `/users/pending-workers/${id}/assign`,
      params,
      config
    );
  },
  deletePendingWorker(params, config = {}) {
    return request("delete", `/users/pending-workers/${params.id}`, {}, config);
  }
};
