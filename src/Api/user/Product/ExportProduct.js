import { BaseApi } from "../../BaseApi";


const ProductList = (obj) =>
    BaseApi.get("user/product",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    ProductList,
}