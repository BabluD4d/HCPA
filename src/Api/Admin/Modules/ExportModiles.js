import { BaseApi } from "../../BaseApi";

const CreateModules = (obj) =>
    BaseApi.post("module", obj);
const ModuilesAll = (obj) =>
    BaseApi.get("module/list",obj);

export default {
    CreateModules,
    ModuilesAll
}