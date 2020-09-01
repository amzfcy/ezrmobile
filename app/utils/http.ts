import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

export async function request(options: AxiosRequestConfig) {

  const { url, data, method = 'get', headers } = options;
  return axios({
    url,
    method,
    data,
    headers,

  }).then(async (res: AxiosResponse) => {
    console.log(res);
    // if (res.status !== 200) {
    //   return {
    //     code: 1,
    //   };
    // }
    return res.data;
  }).catch((err: AxiosError) => {
    console.log(err);
    return Promise.reject(err);
  });
}
