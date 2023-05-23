import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import HeightIcon from '@mui/icons-material/Height';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GetAppIcon from '@mui/icons-material/GetApp';
import { Data } from '../Data';
import { Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const FileTable = (props) => {
  const [dataShow, setdataShow] = useState()
  const [saveData, setsaveData] = useState([])
const Navigate=useNavigate()
  // let saveData=[]
  useEffect(() => {
    // let page = []
    // for (let index = 0; index < 10; index++) {
    //   page.push(Data[index])

    // }
    // setTimeout(() => {
    //   setdataShow(page)
    // });

  }, [])

  const handleChangePage = (event, value) => {
    let start = value - 1
    let end = value * 10
    let page = []
    if (value == 1) {
      for (let index = 1; index <= 10 * value; index++) {
        page.push(Data[index])

      }
      setTimeout(() => {
        setdataShow(page)
      });
    } else {
      for (let index = start * 10 + 1; index <= 10 * value; index++) {
        page.push(Data[index])

      }
      setTimeout(() => {
        setdataShow(page)
      });
    }
  };
  const handlesaveData = (value, item) => {
    if (value == true) {
      saveData.push(item)
    } else {
      let index=""
       saveData.filter((val,i)=>{if(val.id==item.id){
        index=i
       }})
       saveData.splice(index,1)
    }

    setsaveData([...saveData])
    console.log(saveData)
    setTimeout(() => {
      props.handleSaveData(saveData)
    });
  }
  return (
    <>
    <Table striped>
      <thead>
        <tr>
          {/* <th></th> */}
          <th>File Name {" "}   </th>
          <th>Product {" "}  </th>
          <th>Date Modiffed {" "}  </th>
          {/* <th>File Size {" "}  </th> */}
          <th>Action {" "}  </th>
        </tr>
      </thead>
      <tbody>
        {props.FileData?.map((item, i) => {
          return <tr key={item.id}>
            {/* <td><input type="checkbox" id={item.id} name={item.id} onChange={(e) => { handlesaveData(e.target.checked, item) }} value={item?.id} />{i + 1}</td> */}
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
      <Pagination count={props.FileData.length / 10} variant="outlined" onChange={handleChangePage} shape="rounded" />
      {/* <h1> selected Data</h1>
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>File Name {" "} <HeightIcon />  </th>
          <th>Product {" "} <HeightIcon /> </th>
          <th>Date Modiffed {" "} <HeightIcon /> </th>
          <th>File Size {" "} <HeightIcon /> </th>
          <th>Action {" "} <HeightIcon /> </th>
        </tr>
      </thead>
      <tbody>
        {saveData?.map((item, i) => {
          return <tr key={item.id}>
            <td><input type="checkbox" id={item.id} name={item.id} onChange={(e) => { handlesaveData(e.target.checked, item) }} value={item?.id} />{i + 1}</td>
            <td>{item?.title}</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>210 KB</td>
            <td style={{ color: "#0c8ce9" }}><RemoveRedEyeIcon />{" "}<GetAppIcon /> </td>
          </tr>
        })}

      </tbody>
    </Table> */}
    </>
  )
}

export default FileTable