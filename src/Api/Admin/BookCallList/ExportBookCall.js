import { BaseApi } from "../../BaseApi";


const BooKCallListtAll = (obj) =>
    BaseApi.get("bookcall/list",{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    BooKCallListtAll,
}