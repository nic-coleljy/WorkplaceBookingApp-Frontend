import React, { Component,useState } from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CFormCheck,
  CFormLabel,
  CFormFeedback,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'


function Profile(props) {
   const history=useHistory();
   const [fname, setFirstName] = useState();
   const [lname, setLastName] = useState();
   const[role,setRole]= useState();

    //for email
   const [email, setEmail] = useState();
   const [oldEmail, setOldEmail] = useState();

  //for password
   const[oldPassword, setOldPassword]=useState();
   const [firstPassword, setFirstPassword] = useState();
   const [secondPassword, setSecondPassword] = useState();

    const userEmail=localStorage.getItem("username");

     const getUser="http://localhost:8080/api/user/emp/email/" + localStorage.getItem("username")

     const yourConfig = {
        headers: {
           Authorization: "Bearer " + localStorage.getItem("authorization")
        }
     }

    axios.get(getUser,yourConfig).then(res => {
       var json= res.data;
       setFirstName(json["fname"])
       setLastName(json["lname"])
       setRole(json["userRole"])
       if(json["vaccinated"]) setVax("Vaccinated")
       else setVax("Not Vaccinated")

    });

    //update password
      const handlePasswordFormSubmit = event => {
            event.preventDefault();
            const form = event.currentTarget
           if(oldPassword!=localStorage.getItem("password")){
               alert("Wrong password");
               history.push("/Profile");
           }
           if(firstPassword!=secondPassword){
               alert("New password does not match");
               history.push("/Profile");
           }
          const getUser="http://localhost:8080/api/user/emp/email/" + localStorage.getItem("username")
           const yourConfig = {
              headers: {
                 Authorization: "Bearer " + localStorage.getItem("authorization")
              }
           }
          const endpoint = "http://localhost:8080/api/user/emp/new/Password/"+ firstPassword;
           const user_object = {
              email: localStorage.getItem("username"),
              fname: fname,
              lname:lname,
              password: localStorage.getItem("authorization"),
              userRole:role,
          };
          axios.put(endpoint,
          user_object,
           yourConfig).then(res => {

                 history.push("/Dashboard")
          });
  };
  //vax
  const [vax, setVax] = useState("Not Vaccinated");


     return (
       <div className="bg-white min-vh-100 d-flex flex-row align-items-center">
         <CContainer>
           <CRow className="justify-content-center">
             <CCol md={8}>
               <CCardGroup>
                 <CCard className="p-4">
                   <CCardBody>
                       <h1> Profile </h1>
                       <CRow className="mb-3">
                         <CFormLabel className="col-sm-2 col-form-label">Registered Email :</CFormLabel>
                         <CFormLabel className="col-sm-3 col-form-label">{localStorage.getItem("username")}</CFormLabel>
                         <CFormLabel className="col-sm-1 col-form-label">Role :</CFormLabel>
                         <CFormLabel className="col-sm-1 col-form-label">{role}</CFormLabel>
                         <CFormLabel className="col-sm-3 col-form-label">Vaccination Status :</CFormLabel>
                         <CFormLabel className="col-sm-2 col-form-label">{vax}</CFormLabel>
                       </CRow>
                       <CRow className="mb-3">
                           <CFormLabel className="col-sm-2 col-form-label">First Name :</CFormLabel>
                           <CFormLabel className="col-sm-3 col-form-label">{fname}</CFormLabel>
                           <CFormLabel className="col-sm-2 col-form-label"></CFormLabel>
                           <CFormLabel className="col-sm-2 col-form-label">Last  Name :</CFormLabel>
                           <CFormLabel className="col-sm-3 col-form-label">{lname}</CFormLabel>
                       </CRow>

                      <hr className="mt-0" />
                      <h4>Password Settings</h4>
                      <CRow className="mb-3">

                          <CForm onSubmit={handlePasswordFormSubmit}>
                            <CRow className="mb-3">
                              <CCol className="col-sm-2">
                                <CFormLabel className="col-form-label" >Current Password</CFormLabel>
                              </CCol>
                              <CCol className="col-sm-3">
                                <CFormInput type="password" placeholder="Current Password"   onChange={event => setOldPassword(event.target.value)}/>


                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol className="col-sm-2">
                                <CFormLabel className="col-form-label" >New Password</CFormLabel>
                              </CCol>
                              <CCol className="col-sm-3">
                                <CFormInput type="password" placeholder="New Password"   onChange={event => setFirstPassword(event.target.value)}/>

                              </CCol>
                            </CRow>
                            <CRow className="mb-3">
                              <CCol className="col-sm-2">
                                <CFormLabel className="col-form-label" >New Password</CFormLabel>

                              </CCol>
                              <CCol className="col-sm-3">
                                <CFormInput type="password" placeholder="New Password" onChange={event => setSecondPassword(event.target.value)}/>
                              </CCol>
                              <CCol className="col-sm-4">
                              </CCol>
                              <CCol className="col-sm-3">
                                <CButton type="submit" className="mb-3">Update Password</CButton>
                              </CCol>
                            </CRow>
                          </CForm>

                      </CRow>
                   </CCardBody>
                 </CCard>
               </CCardGroup>
              </CCol>

           </CRow>

         </CContainer>
       </div>
     )
   }

export default Profile;
