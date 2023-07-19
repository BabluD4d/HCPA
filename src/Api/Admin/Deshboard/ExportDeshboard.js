import { BaseApi } from "../../BaseApi";

const getAllSoldModule = (filter, date_from, date_to) => 
  BaseApi.get(`get/product/overview?filter=${filter}&date_from=${date_from}&date_to=${date_to}`, {}, {
  headers: {
    Authorization: 'Bearer '+localStorage.getItem("Token"),
    "Content-Type": "application/json",
  }
});

const getAllSoldProduct = (filter, date_from, date_to) => 
  // console.log(filter, date_from, date_to, 'this is the data here...')
  BaseApi.get(`get/product/overview?filter=${filter}&date_from=${date_from}&date_to=${date_to}`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
  }
);

const getAllClientBy = (filter, date_from, date_to) => 
  BaseApi.get(`get/client/overview?filter=${filter}&date_from=${date_from}&date_to=${date_to}`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
});

const getAllStaffBy = (filter, date_from, date_to) => 
  BaseApi.get(`get/staff/dashboard?filter=${filter}&date_from=${date_from}&date_to=${date_to}`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
});

const getListClientBy = (filter, date_from, date_to) => 
  BaseApi.get(`get/client/dashboard?filter=${filter}&date_from=${date_from}&date_to=${date_to}`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
});

const getDashboardProducts = () => 
  BaseApi.get(`get/product/dashboard`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
});

const getAllModulesBy = (filter) => 
  BaseApi.get(`get/modules/dashboard?filter=${filter}`, {}, {
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    }
});



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

      const getProductWiseMeeting = (product_id, date_from, date_to) => 
        BaseApi.get(`get/call/filter/result?product_id=${product_id}&date_from=${date_from}&date_to=${date_to}`, {}, {
          headers: {
            Authorization: 'Bearer '+localStorage.getItem("Token"),
            "Content-Type": "application/json",
          }
        });

export default {
    getAllSoldProduct,
    getAllSoldModule,
    getAllClientBy,
    getListClientBy,
    getAllStaffBy,
    getDashboardProducts,
    getAllModulesBy,
    getAllDeshbord, 
    getAllDeshbordList1,
    getAllProducts,
    // getProductWiseClient,
    getProductWiseMeeting
}