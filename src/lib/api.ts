import axios from "axios";
import { BACKEND_URL } from "../helpers/constants";
import { deleteToken, getToken } from "./authHelper";

const api = axios.create({
  baseURL: BACKEND_URL,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      console.log(error);
      if (401 === error.response.status) {
        deleteToken();
        window.location.href = '/login'
      }

      return Promise.reject(error);
    }
  );



export default api;
