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
const GetEditData = (obj) =>
    BaseApi.get("profile/edit",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const userUpdate = (obj) =>
    BaseApi.put("profile/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const userDelete = (obj) =>
    BaseApi.delete("user/delete/"+obj,{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    // CreateGuid,
    UserAll,
    GetEditData,
    userUpdate,
    userDelete
}