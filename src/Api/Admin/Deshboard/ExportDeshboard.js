import { BaseApi } from "../../BaseApi";

const getAllDeshbord = () =>
    BaseApi.get("admin/dashboard",);

export default {
    getAllDeshbord
}