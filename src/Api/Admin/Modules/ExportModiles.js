import { BaseApi } from "../../BaseApi";

const CreateModules = (obj) =>
    BaseApi.post("module", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ModuilesAll = (obj) =>
    BaseApi.get("module/list",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ModuilesUpdate = (obj) =>
    BaseApi.put("module/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    CreateModules,
    ModuilesAll,
    ModuilesUpdate
}