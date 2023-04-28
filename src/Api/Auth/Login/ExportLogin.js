// import { BaseApi } from "./BaseApi";

import { BaseApi } from "../../BaseApi";

//Auth
const Login = (obj) =>
  BaseApi.post("login", obj);
  const Forgot = (obj) => BaseApi.post("forgot-password", obj);
  export default {Login,Forgot};