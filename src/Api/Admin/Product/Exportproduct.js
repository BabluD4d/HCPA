import { BaseApi } from "../../BaseApi";

const CreateProduct = (obj) =>
    BaseApi.post("product", obj);
const EditProduct = (obj) =>
    BaseApi.put("product/update", obj);
const GetAllProduct = (obj) =>  
    BaseApi.get("product/list",obj);
const Productdelete = (id) =>  
    BaseApi.delete("product/delete/"+id,);

export default {
    CreateProduct,
    GetAllProduct,
    EditProduct,
    Productdelete
}