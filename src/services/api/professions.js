import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", `/professions/all`, params, config);
  }
};
