import React from 'react'
import ExportRegistration from './ExportRegistration';

export default function CoustomRegistration(obj, name) {
    ExportRegistration[name](obj)
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
