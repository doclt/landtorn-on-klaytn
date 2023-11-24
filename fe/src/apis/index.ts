import { getBaseUrlHelper } from '@/utils/env.helpers';
import axios from 'axios';
import queryString from 'query-string';

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Credentials': true,
  'X-Requested-With': 'XMLHttpRequest'
};

const axiosInstance = axios.create({
  baseURL: getBaseUrlHelper(),
  headers,
  paramsSerializer: {
    serialize: (params) => {
        return  queryString.stringify(params)
    }
  }
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

export {
  axios as defaultAxios
}

