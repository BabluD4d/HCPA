import { BaseApi } from "../../BaseApi";

// const CreateGuid = (obj) =>
//     BaseApi.post("guid", obj);
const UserAll = (obj) =>
    BaseApi.get("/user/list",obj,{
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
const userUpdate = (obj) =>
    BaseApi.put("user/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    // CreateGuid,
    UserAll,
    documentGetEditData,
    userUpdate
}