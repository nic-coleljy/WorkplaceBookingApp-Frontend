import React, { Component, useState } from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'
import image from "./background.jpg"
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
  CRow,
  CImage
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons';
import { cilLockLocked, cilUser } from '@coreui/icons'
//import createHistory from 'history/createBrowserHistory';

//const history=createBrowserHistory({forceRefresh:true});
//const background= require('/assets/images/background.jpg')


function ForgetPassword(props) {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  //   const[user, setUser]= useState();


  //     const getCurrentUser = async function () {
  //        const currentUser = await Parse.User.current();
  //        // Update state variable holding current user
  //        setCurrentUser(currentUser);
  //        return currentUser;
  //      };

  const handleFormSubmit = event => {
    event.preventDefault();

         const forgetPassword="http://localhost:8080/authenticate/forget/" + username


           axios.post(forgetPassword).then(res => {
              alert("Email sent for the update of password")
           }).catch((err)=>{
             console.log(err)
             alert("Please ask your admin to register you!")
           });



  };


  return (
    <div className="min-vh-100 d-flex flex-row align-items-center" style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }} >
      <CContainer>
        <CRow className="justify-content-center">
           <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm className="form-signin" onSubmit={handleFormSubmit}>
                    <h1>Forget Password</h1>
                    <p className="text-medium-emphasis">An email will be sent requesting for an update of password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" className="form-control" onChange={event => setUsername(event.target.value)} />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 btn btn-lg btn-primary btn-block" type="submit">
                          Submit
                        </CButton>
                      </CCol>

                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>

        </CRow>
      </CContainer>
    </div>
  )
}


export default ForgetPassword;
