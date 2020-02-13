const errorReader = function(obj) {

  return obj?.response?.data?.errors?.msg[0] || false;
};

export default errorReader;