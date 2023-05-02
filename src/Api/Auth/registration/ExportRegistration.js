import { BaseApi } from "../../BaseApi";

//Auth
const Registration = (obj) =>
  BaseApi.post("new-registration", obj);
  export default {Registration};