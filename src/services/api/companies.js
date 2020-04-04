import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/companies/all`, {}, config);
  },
  get(params, config = {}) {
    return request("get", `/companies`, params, config);
  },
  create(params, config = {}) {
    return request("post", `/companies`, params, config);
  },
  getById(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/companies/${companyId}`, params, config);
  },
  patch(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("patch", `/companies/${companyId}`, params, config);
  },
  delete(params, config = {}) {
    return request("delete", `/companies/${params.companyId}`, {}, config);
  },
  uploadLogo(params, config = {}) {
    return request("post", `/companies/logo/upload`, params, config);
  }
};
