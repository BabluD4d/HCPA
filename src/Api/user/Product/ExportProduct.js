import { BaseApi } from "../../BaseApi";


const ProductList = (obj) =>
    BaseApi.post("user/product",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    ProductList,
}