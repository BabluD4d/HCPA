import { BaseApi } from "../../BaseApi";

const CreateDocument = (obj) =>
    BaseApi.post("document", obj);
const documentAll = (obj) =>
    BaseApi.get("document/list",obj);
const documentGetEditData = (obj) =>
    BaseApi.get("document/edit",obj);
const documentUpdate = (obj) =>
    BaseApi.put("document/update",obj);

export default {
    CreateDocument,
    documentAll,
    documentGetEditData,
    documentUpdate
}