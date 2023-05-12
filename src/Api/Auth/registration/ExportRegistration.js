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
export default { Registration, RegistrationUser };
