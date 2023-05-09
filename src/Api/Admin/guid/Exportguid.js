import { BaseApi } from "../../BaseApi";

const CreateGuid = (obj) =>
    BaseApi.post("guid", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const GuidAll = (obj) =>
    BaseApi.get("guid/list",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const documentGetEditData = (obj) =>
    BaseApi.get("document/edit",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const GuidUpdate = (obj) =>
    BaseApi.post("guid/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    CreateGuid,
    GuidAll,
    documentGetEditData,
    GuidUpdate
}