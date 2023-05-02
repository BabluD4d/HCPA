import { create } from 'apisauce';
const BaseApi = create({
      baseURL: 'http://192.168.0.133:8008/api/',
    headers: {Authorization: localStorage.getItem("Token")},
});
  const BaseUrlImage = ''
export { BaseApi, BaseUrlImage }
