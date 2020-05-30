import request from "../request";

export default {
  getUserAccesses(params, config = {}) {
    return request("get", `/statistics/user-accesses`, params, config);
  }
};
