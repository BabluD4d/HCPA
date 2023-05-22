import { BaseApi } from "../../BaseApi";


const DocumentGetData = (obj) =>
    BaseApi.get("/document/list",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const DocumentGetDataView = (obj) =>
    BaseApi.get("user/document/view",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    DocumentGetData,
    DocumentGetDataView
}