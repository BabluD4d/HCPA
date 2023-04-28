import React from 'react'
import ExportLogin from '../Login/ExportLogin';

export default function CoustomForgot(obj, name) {
    ExportLogin[name](obj)
    .then((resp) => {
        if (resp.data) {
            if (resp.data.code == 200) {
                // localStorage.setItem("Token", resp.data.data[0].token);
                // localStorage.setItem("username", resp.data.data[0].first_name);
                return obj
            } else {

            }
        }
    })
    .catch((err) => console.log(err));
}
