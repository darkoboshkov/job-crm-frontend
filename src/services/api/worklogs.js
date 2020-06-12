import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", "/worklogs/all", params, config);
  },
  getByCompany(params, config = {}) {
    return request("get", `/worklogs/${params.companyId}/all`, params, config);
  },
  getByWorker(params, config = {}) {
    return request(
      "get",
      `/worklogs/${params.companyId}/worker`,
      params,
      config
    );
  },
  approve(params, config = {}) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/approve`,
      params,
      config
    );
  },
  decline(params, config = {}) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/decline`,
      params,
      config
    );
  },
  save(params, config = {}) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/save`,
      params,
      config
    );
  },
  send(params, config = {}) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/submit`,
      params,
      config
    );
  },
  adjust(params, config = {}) {
    return request(
      "patch",
      `/worklogs/${params.companyId}/${params._id}/adjust`,
      params,
      config
    );
  },
  delete(params, config = {}) {
    return request(
      "delete",
      `/worklogs/${params.companyId}/${params._id}/${params.type}`,
      {},
      config
    );
  },
  upload(params, config = {}) {
    return request("post", `/worklogs/attachment/upload`, params, config);
  },
  createExpense(params, config = {}) {
    return request(
      "post",
      `/worklogs/${params.companyId}/expense`,
      params,
      config
    );
  }
};
