import { BaseApi } from "../../BaseApi";


const UserWellcome = (obj) =>
    BaseApi.get("show/welcomebanner",{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    UserWellcome,
}