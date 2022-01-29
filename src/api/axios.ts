import axios from "axios";

const instance = axios.create({
    baseURL:"https://api.exchangerate.host"
})

instance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      if (error.response.status === 500) alert("Something wrong with server");
      return Promise.reject(error);
    }
  );

export default instance