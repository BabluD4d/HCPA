import { BaseApi } from "../../BaseApi";

const CreateAccess = (obj) =>
  BaseApi.post("create/access", obj ,{
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const AccesslistAll = (obj) =>
  BaseApi.get("list/access",obj,{
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const UpdateAccess = (obj) =>
  BaseApi.put("update/access",obj,{
    headers: {
      Authorization: 'Bearer '+localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });

export default {CreateAccess, AccesslistAll, UpdateAccess}