import { BaseApi } from "../../BaseApi";

const CreateRole = (obj) =>
    BaseApi.post("create/role", {"role_name":obj} ,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("Token"),
          "Content-Type": "application/json",
        },
      });
const roleListAll = () => BaseApi.get("list/role");
const deleteRole = (role_id) => BaseApi.delete("delete/role", {'role_id':role_id}, {
    headers: {
        Authorization: 'Bearer '+localStorage.getItem("Token"),
        "Content-Type": "application/json",
    },
});

const updateRole = (roleId, role) => 
    BaseApi.put("update/role", {"role_id":roleId, 'role_name':role}, {
        headers: {
            Authorization: 'Bearer '+localStorage.getItem("Token"),
            "Content-Type": "application/json",
        },
    });

      export default {
        CreateRole,
        roleListAll,
        deleteRole,
        updateRole
    }