import { BaseApi } from "../../BaseApi";

const CreateChecklist = (obj) =>
    BaseApi.post("checklist", obj);
const ChecklistAll = (obj) =>
    BaseApi.get("checklist/show",obj);
const ChecklisGetEditData = (obj) =>
    BaseApi.get("checklist/edit",obj);
const ChecklisUpdate = (obj) =>
    BaseApi.put("/checklist/update",obj);

export default {
    CreateChecklist,
    ChecklistAll,
    ChecklisGetEditData,
    ChecklisUpdate
}