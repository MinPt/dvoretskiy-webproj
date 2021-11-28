import axios from "axios";
import { toast } from "react-toastify";

export const apiEndpoint = "http://localhost:8080/api/";

class ServiceApi {
  constructor(apiEndpoint) {
    this.api = axios.create({
      baseURL: apiEndpoint,
    });

    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("jwtToken");

      if (token !== null) {
        config.headers["x-auth-token"] = token;
      }

      return config;
    });

    this.api.interceptors.response.use(
      (value) => {
        return Promise.resolve(value);
      },
      (error) => {
        const expectedError =
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500;
        if (!expectedError) {
          toast.error("Unexpected error occurs");
        }
        toast.error(error.response.data);
        return Promise.reject(error);
      }
    );
  }
}

export default new ServiceApi(apiEndpoint).api;
