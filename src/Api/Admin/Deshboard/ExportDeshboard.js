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

      const getAllProducts = () => BaseApi.get(`get/product/filter`,{},{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      })

      const getProductWiseModule = (product_id, date_from, date_to) => 
        BaseApi.get(`get/product/filter/result?product_id=${String(product_id)}&date_from=${date_from}&date_to=${date_to}`, {}, {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem("Token"),
            "Content-Type": "application/json",
          }
        });

      const getProductWiseClient = (product_id, date_from, date_to) => 
        BaseApi.get(`get/user/filter/result?product_id=${product_id}&date_from=${date_from}&date_to=${date_to}`, {}, {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem("Token"),
            "Content-Type": "application/json",
          }
        });

      const getProductWiseMeeting = (product_id, date_from, date_to) => 
        BaseApi.get(`get/call/filter/result?product_id=${product_id}&date_from=${date_from}&date_to=${date_to}`, {}, {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem("Token"),
            "Content-Type": "application/json",
          }
        });

export default {
    getAllDeshbord, 
    getAllDeshbordList1,
    getAllProducts,
    getProductWiseModule,
    getProductWiseClient,
    getProductWiseMeeting
}