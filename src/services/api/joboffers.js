import request from "../request";

export default {
  // getAll(params, resolve, reject = null) {
  //   return request("get", `/jobs`, params, resolve, reject);
  // },
  // getCompanyJobs(params, resolve, reject = null) {
  //   const companyId = params.companyId;
  //   delete params.companyId;
  //   return request("get", `/jobs/${companyId}/all`, params, resolve, reject);
  // },
  get(params, resolve, reject = null) {
    return request(
      "get",
      `/joboffers/${params.companyId}/${params.offerId}`,
      resolve,
      reject
    );
  },
  create(params, resolve, reject = null) {
    return request(
      "post",
      `/joboffers/${params.companyId}`,
      params,
      resolve,
      reject
    );
  },
  update(params, resolve, reject = null) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}`,
      params,
      resolve,
      reject
    );
  },
  upload(params, resolve, reject = null) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params._id}/attachment`,
      params,
      resolve,
      reject
    );
  },
  lock(params, resolve, reject = null) {
    // "Lock, Sign and Send" Contract by Manager
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/lock`,
      params,
      resolve,
      reject
    );
  },
  adjust(params, resolve, reject = null) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/adjust`,
      params,
      resolve,
      reject
    );
  },
  getCaoOptions(params, resolve, reject = null) {
    return request(
      "get",
      `/joboffers/${params.companyId}/cao/all`,
      params,
      resolve,
      reject
    );
  }
};