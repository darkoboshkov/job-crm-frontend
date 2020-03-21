import request from "../request";

export default {
  getAll(params) {
    return request("get", "/worklogs/all", params);
  },
  getByCompany(params) {
    return request("get", `/worklogs/${params.companyId}/all`, params);
  },
  getByWorker(params) {
    return request("get", `/worklogs/${params.companyId}/worker`, params);
  },
  approve(params) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/approve`,
      params
    );
  },
  decline(params) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/decline`,
      params
    );
  },
  save(params) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/save`,
      params
    );
  },
  send(params) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/submit`,
      params
    );
  },
  adjust(params) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/adjust`,
      params
    );
  },
  delete(params) {
    return request(
      "delete",
      `/worklogs/${params.companyId}/${params._id}/${params.type}`
    );
  },
  upload(params) {
    return request("post", `/worklogs/attachment/upload`, params);
  },
  createExpense(params) {
    return request("post", `/worklogs/${params.companyId}/expense`, params);
  }
};
