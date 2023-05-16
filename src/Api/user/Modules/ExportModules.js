import { BaseApi } from "../../BaseApi";

const ModulesList = (obj) =>
    BaseApi.post("/user/module",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    ModulesList,
}