// import { BaseApi } from "./BaseApi";

import { BaseApi } from "../../BaseApi";

//Auth
const Login = (obj) =>
  BaseApi.post("login", obj);
  const Forgot = (obj) => BaseApi.post("forget/password", obj);
  const ForgotSetUpdate = (obj) => BaseApi.put("password/update", obj);
  export default {Login,Forgot,ForgotSetUpdate};