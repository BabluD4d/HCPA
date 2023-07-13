import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Link, Routes } from "react-router-dom";
import { Container, Grid, Box } from '@mui/material';
import Sidebar from './commenComponet/Sidebar';
import Header from './commenComponet/Header';
import DashBoard from './User/Componet/DashBoard';
import SignIn from './commenComponet/Login';
import UserInfo from './User/Componet/UserInfo';
import Files from './User/Componet/Files';
// import Modules from './User/Componet/Modules';
import RegistrationGuide from './User/Componet/RegistrationGuide';
import BookCall from './User/Componet/BookCall';
// import { SimpleModules } from './User/Componet/SimpleModules';
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
import Public from './Auth/Public';
import 'react-toastify/dist/ReactToastify.css';
import ChecklistPriveiw from './commenComponet/ChecklistPriveiw';
import EditChecklis from './Admin/EditChecklis';
import CreateRegistrationGuides from './Admin/CreateRegistrationGuides';
import UserDeshboard from './Admin/UserDeshboard';
import UserActiveProductList from './Admin/UserActiveProductList';
import UserActiveModule from './Admin/UserActiveModule';
import AdminViewAns from './Admin/AdminViewAns';
import ForgotSet from './commenComponet/ForgotSet';
import CreateStaff from './Admin/CreateStaff';
import AllCheckList from './User/Componet/AllCheckList';
import Modules from './User/Componet/Modelus';
import { SimpleModules } from './User/Componet/SimpleModelus';
import AccessBySuperAdmin from './Admin/AccessBySuperAdmin';
import CreateRoles from './Admin/CreateRoles';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Box className='wrapper'>
    {/* <div className='wrapper'> */}
      <Routes>
        <Route path="/" element={<Public />}>
        <Route exact path="/" element={<SignIn />} />
        <Route exact path="/signup" element={<Registration />} />
        <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
        <Route exact path="/forget/:token/:email" element={<ForgotSet />} />
          </Route>
        <Route path="/" element={<Proctected />}>
          <Route exact path="/Home" element={<DashBoard />} />
          <Route exact path="/Profile" element={<UserInfo />} />
          <Route exact path="/Files" element={<Files />} />
          <Route exact path="/Modules" element={<Modules />} />
          <Route exact path="/Modules/all" element={<SimpleModules />} />
          <Route exact path="/all/CheckList" element={<AllCheckList />} />
          <Route exact path="/Modules/Document" element={<AllDocument />} />
          <Route exact path="/Modules/CheckList" element={<CheckList />} />
          <Route exact path="/Modules/Document/ViewDocument" element={<ViewDocument />} />
          <Route exact path="/BookCall/:id" element={<BookCall />} />
          <Route exact path="/BookCall/" element={<BookCall />} />
          <Route exact path="/Modules/Guides" element={<RegistrationGuide />} />
        </Route>
        {/* admin */}
        
        <Route path="/" element={<AdminProctected />}>
          <Route exact path="/DashBoard" element={<AdminDashBoard />} />
          <Route exact path="/Admin" element={<AdminDashBoard />} />
          <Route exact path="/UserDeshboard" element={<UserDeshboard />} />
          <Route exact path="/UserList" element={<UserList />} />
          <Route exact path="/CreateStaff" element={<CreateStaff />} />
          <Route exact path="/UserList/product/active" element={<UserActiveProductList />} />
          <Route exact path="/UserList/module/active" element={<UserActiveModule />} />
          <Route exact path="/Productlist" element={<Product />} />
          <Route exact path="/Productlist/cretechalist" element={<CreateCheckList />} />
          <Route exact path="/checklist/Edit/:id" element={<EditChecklis />} />
          <Route exact path="/Profile/Admin" element={<UserInfo />} />
          <Route exact path="/Productlist/moduleList" element={<ProductByModuleList />} />
          <Route exact path="/callList" element={<CallListBook />} />
          <Route exact path="/CreateRegistrationGuides" element={<CreateRegistrationGuides />} />
          <Route exact path="/CreateProduct" element={<CreateProduct />} />
          <Route exact path="/CreateUser" element={<CreateUser />} />
          <Route exact path="/CreactModules" element={<CreactModules />} />
          <Route exact path="/CreateDocuments" element={<CreateDocuments />} />
          <Route exact path="/UserActionView" element={<UserActionView />} />
          <Route exact path="/UserAnsView" element={<AnsPrvue />} />
          <Route exact path="/checklist/preview" element={<ChecklistPriveiw />} />
          <Route exact path="/ModulesList" element={<ModulesList />} />
          <Route exact path="/AdminViewAns" element={<AdminViewAns />} />
          <Route exact path="/Admin/AllDocumentAdmin" element={<AllDocumentAdmin />} />
          <Route exact path="/EditDocument" element={<EditDocument />} />
          <Route exact path="/ActiveModuleByUser" element={<ActiveModuleByUser />} />
          <Route exact path="/Modules/Document/ViewDocument1/:id" element={<ViewDocument />} />
          <Route exact path="/Access" element={<AccessBySuperAdmin />} />
          <Route exact path="/Role" element={<CreateRoles />} />
        </Route>
        <Route path='*' element={<NotFound />} />           
      </Routes>
    </Box>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
