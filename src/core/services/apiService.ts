import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL:
    "http://ec2-13-212-34-182.ap-southeast-1.compute.amazonaws.com:8080/",
  timeout: 5000,
});

/**
 * No need for API request interceptors since we are not expecting the use of auth for this
 */
api.interceptors.request.use((config) => config);

/**
 * API response interceptors to help us catch strange errors
 */
api.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    const response = error.response;
    if (isServerError(response)) {
      return Promise.reject(getErrorMessage(error));
    }
  }
);

function isServerError(response?: AxiosResponse): boolean {
  const statusCode = response ? response.status : 0;
  return (
    statusCode === 0 ||
    statusCode === 500 ||
    statusCode === 503 ||
    statusCode === 504
  );
}

function getErrorMessage(error: AxiosError): string {
  const status = error.response ? error.response.status : 0;
  switch (status) {
    case 403:
      return "Access Denied";
    case 0:
    case 504:
    case 503:
    case 500:
      return "The server is currently unavailable";
    default:
      return error.message;
  }
}

export default api;
export { api };
