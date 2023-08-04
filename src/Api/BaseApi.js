import { create } from 'apisauce';
const BaseApi = create({
  // baseURL: 'https://healthcare.digital4design.in/api/',
    baseURL: 'http://16.171.100.244/api/',
    headers: {Authorization:'Bearer '+ localStorage.getItem("Token")},
});
  // const BaseUrlImage = 'http://192.168.0.133:8008/'
  const BaseUrlImage = 'https://healthcare.digital4design.in/public/'
export { BaseApi, BaseUrlImage }
