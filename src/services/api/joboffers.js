import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/joboffers/all`, params, config);
  },
  getAllByCompany(params, config = {}) {
    return request("get", `/joboffers/${params.companyId}/all`, params, config);
  },
  getAllByJobId(params, config = {}) {
    const companyId = params.companyId;
    const jobId = params.jobId;
    delete params.companyId;
    delete params.jobId;
    return request(
      "get",
      `/joboffers/${companyId}/job/${jobId}`,
      params,
      config
    );
  },
  getAllByWorker(params, config = {}) {
    const companyId = params.companyId;
    delete params.companyId;
    return request("get", `/joboffers/${companyId}/worker`, params, config);
  },
  get(params, config = {}) {
    return request(
      "get",
      `/joboffers/${params.companyId}/${params.offerId}`,
      {},
      config
    );
  },
  create(params, config = {}) {
    return request("post", `/joboffers/${params.companyId}`, params, config);
  },
  update(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}`,
      params,
      config
    );
  },
  lock(params, config = {}) {
    // "Lock, Sign and Send" Contract by Manager
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/lock`,
      params,
      config
    );
  },
  adjust(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/adjust`,
      params,
      config
    );
  },
  getCaoOptions(params, config = {}) {
    return request(
      "get",
      `/joboffers/${params.companyId}/cao/all`,
      params,
      config
    );
  },
  sign(params, config = {}) {
    // "Sign" Contract by Worker
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/sign`,
      params,
      config
    );
  },
  hiringCompanySign(params, config = {}) {
    // "Sign" Contract by manager
    return request(
      "patch",
      `/joboffers/${params.hiringCompanyId}/${params._id}/company-contract/sign`,
      params,
      config
    );
  },
  createCurrentJobOffer(params, config = {}) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params.offerId}/contract/extend-current`,
      params,
      config
    );
  },
  createNewJobOffer(params, config = {}) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params.offerId}/contract/extend-new`,
      params,
      config
    );
  },
  getCurrentEndDate(params, config = {}) {
    return request(
      "get",
      `/joboffers/${params.companyId}/${params.offerId}/end-date`,
      params,
      config
    );
  },
  endContract(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params.offerId}/contract/end`,
      params,
      config
    );
  },
  decline(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/contract/decline`,
      params,
      config
    );
  },
  declineCompanyContract(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.hiringCompanyId}/${params._id}/company-contract/decline`,
      params,
      config
    );
  },
  delete(params, config = {}) {
    return request(
      "delete",
      `/joboffers/${params.companyId}/${params._id}`,
      {},
      config
    );
  },
  upload(params, config = {}) {
    return request("post", `/joboffers/attachment/upload`, params, config);
  },
  addAttachment(params, config = {}) {
    return request(
      "patch",
      `/joboffers/${params.companyId}/${params._id}/attachment`,
      params,
      config
    );
  },
  downloadAttachment(params, config = {}) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params.id}/attachment/${params.attachmentId}/download`,
      {},
      {
        responseType: "blob"
      }
    );
  },
  downloadWorkerContract(params, config = {}) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params.id}/worker-contract/download`,
      {},
      {
        responseType: "blob"
      }
    );
  },
  downloadCompanyContract(params, config = {}) {
    return request(
      "post",
      `/joboffers/${params.companyId}/${params.id}/company-contract/download`,
      {},
      {
        responseType: "blob"
      }
    );
  },
  deleteAttachment(params, config = {}) {
    return request(
      "delete",
      `/joboffers/${params.companyId}/${params._id}/attachment/${params.attachmentId}`,
      {},
      config
    );
  }
};
