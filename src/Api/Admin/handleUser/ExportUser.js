import { BaseApi } from "../../BaseApi";

// const CreateGuid = (obj) =>
//     BaseApi.post("guid", obj);
const UserAll = (obj) =>
    BaseApi.get("user/list/2",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const UserAllStaff = (obj) =>
    BaseApi.get("staff/list",obj,{
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
const userUpdateStaff = (obj) =>
    BaseApi.put("staff/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const userUpdateUserList = (obj) =>
    BaseApi.put("user/update",obj,{
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
    UserAllStaff,
    GetEditData,
    userUpdate,
    userUpdateUserList,
    userDelete,
    userUpdateStaff
}