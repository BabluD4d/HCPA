import { BaseApi } from "../../BaseApi";

const getAllDeshbord = () =>
    BaseApi.get("admin/dashboard",{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    getAllDeshbord
}