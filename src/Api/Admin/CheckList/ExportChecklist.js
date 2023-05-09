import { BaseApi } from "../../BaseApi";

const CreateChecklist = (obj) =>
    BaseApi.post("checklist", obj ,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ChecklistAll = (obj) =>
    BaseApi.get("checklist/show",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ChecklisGetEditData = (obj) =>
    BaseApi.get("checklist/edit",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const ChecklisUpdate = (obj) =>
    BaseApi.put("/checklist/update",obj,{
        headers: {
          Authorization: 'Bearer '+localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });

export default {
    CreateChecklist,
    ChecklistAll,
    ChecklisGetEditData,
    ChecklisUpdate
}