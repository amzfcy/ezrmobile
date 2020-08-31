import request = require('request');
export async function requests(options) {

  console.log(request);
  const { url, data, method = 'get', headers } = options;
  // return axios({
  //   url,
  //   method,
  //   data,
  //   headers,
  // }).then(async (res: AxiosResponse) => {
  //   console.log(res);
  //   // if (res.status !== 200) {
  //   //   return {
  //   //     code: 1,
  //   //   };
  //   // }
  //   return res.data;
  // }).catch((err: AxiosError) => {
  //   console.log(err);
  //   return Promise.reject(err);
  // });

  return request({
    url,
    method,
    data,
    headers,
    rejectUnauthorized: false,
  }, (err, res) => {
    console.log(err);
    console.log('000000000');
    console.log(res);
  });

}
