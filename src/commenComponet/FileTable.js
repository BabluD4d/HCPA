import React from 'react'
import { Box } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom';
const FileTable = (props) => {
const Navigate=useNavigate()
  return (
    <Box sx={{width: '100%', overflowX:{xs:'scroll', sm:'visible'}}}>
    <Table striped className="file-modules-table">
      <thead>
        <tr>
          <th>File Name {" "}   </th>
          <th>Product {" "}  </th>
          <th>Date Modiffed {" "}  </th>
          <th>Action {" "}  </th>
        </tr>
      </thead>
      <tbody>
        {props.FileData?.map((item, i) => {
          return <tr key={item.id}>
            <td>{item?.document_title}</td>
            <td>{item?.product_name}</td>
            <td>{item?.modified_date}</td>
            <td style={{ color: "#0CB4D0" }}><RemoveRedEyeIcon  onClick={()=>{localStorage.setItem("ViewDocument",JSON.stringify(item));
            setTimeout(() => {
              Navigate("/Modelus/Document/ViewDocument")
            });
          }}/> </td>
          </tr>
        })}

      </tbody>
    </Table>    
    </Box>
  )
}

export default FileTable