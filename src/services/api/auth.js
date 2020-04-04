import request from "../request";

export default {
  login(params, config = {}) {
    return request("post", "/auth/login", params, config);
  },
  signup(params, config = {}) {
    return request("post", "/auth/register", params, config);
  },
  verify(params, config = {}) {
    return request("post", "/auth/verify", params, config);
  },
  forgot(params, config = {}) {
    return request("post", "/auth/forgot", params, config);
  },
  reset(params, config = {}) {
    return request("post", "/auth/reset", params, config);
  },
  invitation(params, config = {}) {
    return request("post", "/auth/invitation", params, config);
  }
};
