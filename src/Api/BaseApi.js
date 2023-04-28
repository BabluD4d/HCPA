import { create } from 'apisauce';
const BaseApi = create({
      baseURL: '',
    headers: {Authorization: localStorage.getItem("Token")},
});
  const BaseUrlImage = ''
export { BaseApi, BaseUrlImage }
