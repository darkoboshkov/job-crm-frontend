import request from "../request";

export default {
  get(params, resolve, reject = null) {
    return request(
      "get",
      `/profile/${params.companyId}/${params.id}`,
      resolve,
      reject
    );
  },
  patchById(params, resolve, reject = null) {
    const id = params.id;
    const companyId = params.companyId;
    delete params.id;
    delete params.companyId;
    return request(
      "patch",
      `/profile/${companyId}/${id}`,
      params,
      resolve,
      reject
    );
  },
  patch(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("patch", `/profile/${companyId}`, params, resolve, reject);
  }
};
