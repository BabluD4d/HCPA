import { BaseApi } from "../../BaseApi";


const UserWellcome = (obj) =>
    BaseApi.get("bookcall/list",{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    UserWellcome,
}