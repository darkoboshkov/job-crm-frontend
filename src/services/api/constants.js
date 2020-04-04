import request from "../request";

export default {
  getAll(params, config = {}) {
    return request("get", "constants/all", {}, config);
  }
};
