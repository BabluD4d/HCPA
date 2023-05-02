import React from 'react'
import ExportRegistration from './ExportRegistration';
import { toast } from 'react-toastify';

export default function CoustomRegistration(obj, name,Navigate) {
    ExportRegistration[name](obj)
        .then((resp) => {
            if (resp.data) {
                if (resp.data) {
                    console.log(resp.data)
                    toast.success('Acount Created successfully', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setTimeout(() => {
                        Navigate('/Productlist')
                    }, 5000);
                    return obj
                } else {
                    toast.error('Something went rong', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    })
                }
            }
        })
        .catch((err) => toast.error('Something went rong', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }));
}
