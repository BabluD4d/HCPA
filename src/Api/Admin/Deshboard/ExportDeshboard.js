import { BaseApi } from "../../BaseApi";

const getAllDeshbord = () =>
    // BaseApi.get("admin/dashboard",{},{
    //     headers: {
    //       Authorization: 'Bearer '+localStorage.getItem("Token"),
    //       "Content-Type": "application/json",
    //     },
    //   });
    BaseApi.get("dashboard/list/2",{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const getAllDeshbordList1 = (obj) =>
    BaseApi.get(`dashboard/list/1`,obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    getAllDeshbord, 
    getAllDeshbordList1
}