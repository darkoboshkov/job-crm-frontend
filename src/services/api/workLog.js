import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request("get", "/worklogs/all", params, resolve, reject);
  },
  getByCompany(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("get", `/worklogs/${companyId}/all`, params, resolve, reject);
  },
  approve(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("patch", `/worklogs/${companyId}/${params._id}/approve`, params, resolve, reject);
  },
  decline(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("patch", `/worklogs/${companyId}/${params._id}/decline`, params, resolve, reject);
  },
  save(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("patch", `/worklogs/${companyId}/${params._id}/save`, params, resolve, reject);
  },
  send(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("patch", `/worklogs/${companyId}/${params._id}/submit`, params, resolve, reject);
  },
  adjust(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;

    return request("patch", `/worklogs/${companyId}/${params._id}/adjust`, params, resolve, reject);
  },

  // getAllWorkers(params, resolve, reject = null) {
  //   return request("get", "/users/workers", params, resolve, reject);
  // },
  // getAllPendingWorkers(params, resolve, reject = null) {
  //   return request("get", "/users/pending-workers", params, resolve, reject);
  // },
  // getCompanyWorkers(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   delete params.companyId;
  //   return request(
  //     "get",
  //     `/users/${companyId}/workers/all`,
  //     params,
  //     resolve,
  //     reject
  //   );
  // },
  // getAvailableCompanyWorkers(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   delete params.companyId;
  //   return request(
  //       "get",
  //       `/users/${companyId}/available-workers/all`,
  //       params,
  //       resolve,
  //       reject
  //   );
  // },
  // get(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   const userId = params.userId;
  //   delete params.companyId;
  //   delete params.userId;
  //   return request(
  //     "get",
  //     `/users/${companyId}/${userId}`,
  //     params,
  //     resolve,
  //     reject
  //   );
  // },
  // create(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   delete params.companyId;
  //   return request("post", `/users/${companyId}`, params, resolve, reject);
  // },
  // invite(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   delete params.companyId;
  //   return request(
  //     "post",
  //     `/users/${companyId}/invite`,
  //     params,
  //     resolve,
  //     reject
  //   );
  // },
  // update(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   const id = params.id;
  //   delete params.companyId;
  //   delete params.id;
  //   return request(
  //     "patch",
  //     `/users/${companyId}/${id}`,
  //     params,
  //     resolve,
  //     reject
  //   );
  // },
  // delete(params, resolve, reject = null) {
  //   return request(
  //     "delete",
  //     `/users/${params.companyId}/${params.id}`,
  //     resolve,
  //     reject
  //   );
  // },
  // assignPendingWorker(params, resolve, reject = null) {
  //   const id = params.id;
  //   delete params.id;
  //   return request(
  //     "patch",
  //     `/users/pending-workers/${id}/assign`,
  //     params,
  //     resolve,
  //     reject
  //   );
  // },
  // deletePendingWorker(params, resolve, reject = null) {
  //   return request(
  //     "delete",
  //     `/users/pending-workers/${params.id}`,
  //     resolve,
  //     reject
  //   );
  // }
};
