import React from 'react'
import { useNavigate } from 'react-router-dom';
import ExportLogin from './ExportLogin';
export const CoustomLogin = (obj, name) => {
    ExportLogin[name](obj)
        .then((resp) => {
            if (resp.data.data) {
                localStorage.setItem("Token", resp.data.data.token);
                localStorage.setItem("userdata", JSON.stringify(resp.data.data));
                localStorage.setItem("role", resp.data.data.role);
                console.log(resp.data.data)
                return 1

            }
        })
}


