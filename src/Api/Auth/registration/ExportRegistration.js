import { BaseApi } from "../../BaseApi";

//Auth
const Registration = (obj) =>
  BaseApi.post("/user", obj,{
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
  export default {Registration};