import { BaseApi } from "../../BaseApi";

const ModulesList = (obj) =>
    BaseApi.get("user/module",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const guidUpdateUser = (obj) =>
    BaseApi.put("user/registration/guide/upd",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const getChacklistAll = (obj) =>
    BaseApi.get("get/all/checklists",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    ModulesList,
    guidUpdateUser,
    getChacklistAll
}