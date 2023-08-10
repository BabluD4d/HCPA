import { BaseApi } from "../../BaseApi";

//Auth
const Registration = (obj) =>
  BaseApi.post("/user", obj, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const RegistrationUser = (obj) =>
  BaseApi.post("/new-registration", obj, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const CreateStaff = (obj) =>
  BaseApi.post("create/staff", obj, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const getRoleId = (obj) =>
  BaseApi.get("get/role", obj, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
const getRoleIdAccess = (obj) =>
  BaseApi.get("get/access/role", obj, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("Token"),
      "Content-Type": "application/json",
    },
  });
export default { Registration, RegistrationUser ,CreateStaff,getRoleId,getRoleIdAccess};