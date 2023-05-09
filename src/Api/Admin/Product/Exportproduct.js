import { BaseApi } from "../../BaseApi";

const CreateProduct = (obj) =>
    BaseApi.post("product", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const EditProduct = (obj) =>
    BaseApi.put("product/update", obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const GetAllProduct = (obj) =>  
    BaseApi.get("product/list",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const Productdelete = (id) =>  
    BaseApi.delete("product/delete/"+id,{},{
      headers: {
        Authorization: 'Bearer '+localStorage.getItem("Token"),
        "Content-Type": "application/json",
      },
    });

export default {
    CreateProduct,
    GetAllProduct,
    EditProduct,
    Productdelete
}