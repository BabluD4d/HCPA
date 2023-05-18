import { BaseApi } from "../../BaseApi";

const purchaselistProduct = (obj) =>
    BaseApi.post("user/product/purchaselist", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const purchaselistModule = (obj) =>
    BaseApi.post("user/module/purchaselist", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const purchaselistProductHendle = (obj) =>
    BaseApi.post("purchase/product", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const purchaselistmoduletHendle = (obj) =>
    BaseApi.post("purchase/module", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ViewUserFillChecklist = (obj) =>
    BaseApi.post("register/list/checklist", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ViewAnsChecklist = (obj) =>
    BaseApi.post("register/view/checklist", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });


export default {
    purchaselistProduct,
    purchaselistProductHendle,
    purchaselistModule,
    purchaselistmoduletHendle,
    ViewUserFillChecklist,
    ViewAnsChecklist,
}