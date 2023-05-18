import React from 'react'
import ExportRegistration from './ExportRegistration';
import { toast } from 'react-toastify';

export default function CoustomRegistration(obj, name,Navigate) {
    ExportRegistration[name](obj)
        .then((resp) => {
            if (resp.data) {
                if (resp.data) {
                    console.log(resp.data)
                    if(resp.data.message=="create user successfully"){

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
                            Navigate('/UserList')
                        }, 1000);
                    }else {
                        toast.error('Something went wrong', {
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
            }
        })
        .catch((err) => toast.error('Something went wrong', {
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
