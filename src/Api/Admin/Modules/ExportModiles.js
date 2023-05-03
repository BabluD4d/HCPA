import { BaseApi } from "../../BaseApi";

const CreateModules = (obj) =>
    BaseApi.post("module", obj);
const ModuilesAll = (obj) =>
    BaseApi.get("module/list",obj);
const ModuilesUpdate = (obj) =>
    BaseApi.put("module/update",obj);

export default {
    CreateModules,
    ModuilesAll,
    ModuilesUpdate
}