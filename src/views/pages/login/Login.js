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


function Login(props) {
  const history = useHistory();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [authenticated, setAuthenticated]=useState(false);


  const handleFormSubmit = event => {
    event.preventDefault();

    const endpoint = "http://localhost:8080/authenticate";

    // const username = state.username;
    // const password = state.password;

    const user_object = {
      username: username,
      password: password
    };

    axios.post(endpoint, user_object).then(res => {
      if(res.status==401){
      alert("Wrong password or username")
      }

      localStorage.setItem("authorization", res.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);

      localStorage.setItem("authenticated",true);

      history.push("/dashboard");
    })

    ;
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
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Please Enter Username And Password</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" className="form-control" onChange={event => setUsername(event.target.value)} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        onChange={event => setPassword(event.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4 btn btn-lg btn-primary btn-block" type="submit">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0"
                        onClick={(event) => {

                              history.push({
                                pathname: "/ForgetPassword",

                              })
                            }
                            }


                        >
                          Forgot password?
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


export default withRouter(Login);
