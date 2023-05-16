import { BaseApi } from "../../BaseApi";


const UserBookCall = (obj) =>
    BaseApi.post("bookcall",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    UserBookCall,
}