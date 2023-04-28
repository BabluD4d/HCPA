import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Container, Grid } from '@mui/material';
import Sidebar from './commenComponet/Sidebar';
import Header from './commenComponet/Header';
import DashBoard from './User/Componet/DashBoard';
import SignIn from './commenComponet/Login';
import UserInfo from './User/Componet/UserInfo';
import Files from './User/Componet/Files';
import Modelus from './User/Componet/Modelus';
import RegistrationGuide from './User/Componet/RegistrationGuide';
import BookCall from './User/Componet/BookCall';
import { SimpleModelus } from './User/Componet/SimpleModelus';
import DocumentCard from './commenComponet/DocumentCard';
import AllDocument from './User/Componet/AllDocument';
import ViewDocument from './User/Componet/ViewDocument';
import { CheckList } from './User/CheckList/CheckList';
import CreateProduct from './Admin/CreateProduct';
import CreateUser from './Admin/CreateUser';
import CreactModules from './Admin/CreactModules';
import CreateDocuments from './Admin/CreateDocuments';
import AdminDashBoard from './Admin/AdminDashBoard';
import UserList from './Admin/UserList';
import CallListBook from './Admin/CallListBook';
import { UserActionView } from './Admin/UserActionView';
import Product from './Admin/Product';
import ModulesList from './Admin/ModulesList';
import AllDocumentAdmin from './Admin/AllDocument';
import EditDocument from './Admin/EditDocument';
import ActiveModuleByUser from './Admin/ActiveModuleByUser';
import ProductByModuleList from './Admin/ProductByModuleList';
import CreateCheckList from './Admin/CreateCheckList';
import AnsPrvue from './Admin/AnsPrvue';
import AdminProctected from './Auth/AdminProcted';
import Proctected from './Auth/ProctectedUser';
import NotFound from './commenComponet/NotFound';
import Registration from './commenComponet/Registration';
import ForgotPassword from './commenComponet/ForgotPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <div className='wrapper'>
      {/* <Grid container spacing={2}>
        <Sidebar />
        <Grid item md={12} sm={12} xl={10} lg={12} xs={12} sx={{ height: "100vh", overflow: "auto" }} >
          <Header /> */}
          <Routes>
            <Route exact path="/login" element={<SignIn />} />
            <Route exact path="/signup" element={<Registration />} />
            <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
            <Route path="/" element={<Proctected />}>
              <Route exact path="/" element={<DashBoard />} />
              <Route exact path="/Profile" element={<UserInfo />} />
              <Route exact path="/Files" element={<Files />} />
              <Route exact path="/Modelus" element={<Modelus />} />
              <Route exact path="/Modelus/all" element={<SimpleModelus />} />
              <Route exact path="/Modelus/Document" element={<AllDocument />} />
              <Route exact path="/Modelus/CheckList" element={<CheckList />} />
              <Route exact path="/Modelus/Document/ViewDocument" element={<ViewDocument />} />
              <Route exact path="/BookCall" element={<BookCall />} />
              <Route exact path="/Modelus/Guides" element={<RegistrationGuide />} />
            </Route>
            {/* admin */}
            <Route path="/" element={<AdminProctected />}>
              <Route exact path="/Admin" element={<AdminDashBoard />} />
              <Route exact path="/DashBoard" element={<AdminDashBoard />} />
              <Route exact path="/UserList" element={<UserList />} />
              <Route exact path="/Productlist" element={<Product />} />
              <Route exact path="/Productlist/cretechalist" element={<CreateCheckList />} />
              <Route exact path="/Productlist/moduleList" element={<ProductByModuleList />} />
              <Route exact path="/callList" element={<CallListBook />} />
              <Route exact path="/CreateProduct" element={<CreateProduct />} />
              <Route exact path="/CreateUser" element={<CreateUser />} />
              <Route exact path="/CreactModules" element={<CreactModules />} />
              <Route exact path="/CreateDocuments" element={<CreateDocuments />} />
              <Route exact path="/UserActionView" element={<UserActionView />} />
              <Route exact path="/UserAnsView" element={<AnsPrvue />} />
              <Route exact path="/ModulesList" element={<ModulesList />} />
              <Route exact path="/Admin/AllDocumentAdmin" element={<AllDocumentAdmin />} />
              <Route exact path="/EditDocument" element={<EditDocument />} />
              <Route exact path="/ActiveModuleByUser" element={<ActiveModuleByUser />} />

            </Route>
             <Route path='*' element={<NotFound />} />
           
          </Routes>
        {/* </Grid> */}
      {/* </Grid> */}

    </div>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
