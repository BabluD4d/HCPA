import { BaseApi } from "../../BaseApi";

//Auth
const Registration = (obj) =>
  BaseApi.post("user", obj);
  export default {Registration};