import axios from "axios";

axios.interceptors.response.use(null, error => {
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500;
  
    // if (!expectedError) {
    //   logger.log(error);
    //   toast.error("An unexpected error occurred.");
    // }
  
    return Promise.reject(error);
  });
  
  function setJwt(jwt) {
    axios.defaults.headers.common["x-access-token"] = jwt;
  }
  
  export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    setJwt
  };