import { BaseApi } from "../../BaseApi";

const CreateBanner = (obj) =>
    BaseApi.post("welcomebanner", obj);

    export default {
        CreateBanner,
    }