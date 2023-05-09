import { BaseApi } from "../../BaseApi";

const CreateDocument = (obj) =>
    BaseApi.post("document", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const documentAll = (obj) =>
    BaseApi.get("document/list",obj,{
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
const documentUpdate = (obj) =>
    BaseApi.put("document/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    CreateDocument,
    documentAll,
    documentGetEditData,
    documentUpdate
}