import { BaseApi } from "../../BaseApi";

const CreateGuid = (obj) =>
    BaseApi.post("guid", obj);
const GuidAll = (obj) =>
    BaseApi.get("guid/list",obj);
const documentGetEditData = (obj) =>
    BaseApi.get("document/edit",obj);
const GuidUpdate = (obj) =>
    BaseApi.post("guid/update",obj);

export default {
    CreateGuid,
    GuidAll,
    documentGetEditData,
    GuidUpdate
}