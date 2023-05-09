import { BaseApi } from "../../BaseApi";

const CreateBanner = (obj) =>
    BaseApi.post("welcomebanner", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

    export default {
        CreateBanner,
    }