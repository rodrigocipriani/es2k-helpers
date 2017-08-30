import axios from 'axios';

const api = (baseUrl) => {
  const create = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
  });

  create.interceptors.request.use(request => request, (error) => {
    error.msg = 'Fail on send data.';
    console.error(error.msg, error, error.request);
    return Promise.reject(error);
  });

  create.interceptors.response.use(response => response, (error) => {
    const response = error.response;
    error.msg = response && response.data ? response.data.msg : 'Fail on get data.';
    console.error(error.msg, error, error.response);
    return Promise.reject(error);
  });

  return create;
};

export default api;
