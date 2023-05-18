import { BaseApi } from "../../BaseApi";


const CheckListView = (obj) =>
    BaseApi.post("checklist/view",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const CheckListsend = (obj) =>
    BaseApi.post("register/user/checklist",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
export default {
    CheckListView,
    CheckListsend
}