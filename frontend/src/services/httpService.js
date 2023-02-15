import axios from "axios";

axios.interceptors.response.use(null, error => {
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