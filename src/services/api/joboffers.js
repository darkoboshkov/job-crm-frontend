import request from "../request";

export default {
  getAll(params, resolve, reject = null) {
    return request(
      "get",
      `/joboffers/${params.companyId}/all`,
      params,
      resolve,
      reject
    );
  },
  getAllByJobId(params, resolve, reject = null) {
    const companyId = params.companyId;
    const jobId = params.jobId;
    delete params.companyId;
    delete params.jobId;
    return request(
      "get",
      `/joboffers/${companyId}/job/${jobId}`,
      params,
      resolve,
      reject
    );
  },
  getAllByWorker(params, resolve, reject = null) {
    const companyId = params.companyId;
    delete params.companyId;
    return request(
      "get",
      `/joboffers/${companyId}/worker`,
      params,
      resolve,
      reject
    );
  },
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
      `/joboffers/attachment/upload`,
      params,
      resolve,
      reject
    );
  },
  addAttachment(params, resolve, reject = null) {
    return request(
      "patch",
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
  },
  sign(params, resolve, reject = null) {
    // "Sign" Contract by Worker
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/sign`,
      params,
      resolve,
      reject
    );
  },
  decline(params, resolve, reject = null) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/decline`,
      params,
      resolve,
      reject
    );
  },
  deleteAttachment(params, resolve, reject = null) {
    return request(
      "delete",
      `/joboffers/${params.companyId}/${params._id}/attachment/${params.attachmentId}`,
      resolve,
      reject
    );
  }
};
