import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export async function request(options: AxiosRequestConfig) {

  const { url, data, method = 'get' } = options;
  return axios({
    url,
    method,
    data,
  }).then(async (res: AxiosResponse) => {
    // if (res.status !== 200) {
    //   return {
    //     code: 1,
    //   };
    // }
    return res.data;
  }).catch((err: AxiosError) => {
    return Promise.reject(err);
  });
}
