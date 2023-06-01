import { BaseApi } from "../../BaseApi";


const ChangePassword = (obj) =>
    BaseApi.put("/profile/password/reset",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    ChangePassword,
}