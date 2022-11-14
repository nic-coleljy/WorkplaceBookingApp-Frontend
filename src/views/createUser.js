import React, { Component, useState } from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
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
//import createHistory from 'history/createBrowserHistory';

//const history=createBrowserHistory({forceRefresh:true});



function CreateUser(props) {
  const history = useHistory();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [password, setPassword] = useState();
  const [cid, setCid] = useState();
  const [email, setEmail] = useState();
  const [secondEmail, setSecondEmail] = useState();
  const [role, setRole] = useState("HR");
  //     const getCurrentUser = async function () {
  //        const currentUser = await Parse.User.current();
  //        // Update state variable holding current user
  //        setCurrentUser(currentUser);
  //        return currentUser;
  //      };
  const [validated, setValidated] = useState(false)


  const handleFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget

    if (email != secondEmail) {
      alert("Emails are inconsistent")
      history.push("/CreateUser")
    }
    if (form.checkValidity() === false) {
      event.preventDefault()
      event.stopPropagation()
    }
    setValidated(true)

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization")
      }
    }
    history.push("/UserManagement");
    const endpoint = "http://localhost:8080/api/user/hr/new";

    // const username = state.username;
    // const password = state.password;
    console.log("Before ", role)
    const user_object = {
      fname: firstName,
      password: password,
      email: email,
      userRole: role,
      lname: lastName,
      company: {
        cid: cid
      }

    };
    console.log(user_object)
    axios.post(endpoint, user_object, yourConfig).then(res => {
      if (res.response == 200) {
        history.push("/UserManagement");
      }

    }).then(() => { window.location.reload(false) });
  };



  return (
    <div className="bg-white min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <form className="form-signin" onSubmit={handleFormSubmit}>
                    <h1>Create New Users</h1>
                    <p className="text-medium-emphasis">Submit the form with all details filled to add a new user. New users will receive their password via the registered email submitted in this form within 10minutes.</p>
                    <CRow className="mb-3">
                      <CCol className="col-sm-3">
                        <CFormLabel className="col-form-label" >User&#39;s Email</CFormLabel>
                      </CCol>
                      <CCol className="col-sm-9">
                        <input type="email"
                          className="form-control"
                          placeholder="Enter the email"
                          onChange={event => setEmail(event.target.value)}
                          required />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className="col-sm-3">
                        <CFormLabel className="col-form-label" >User&#39;s Email</CFormLabel>
                      </CCol>
                      <CCol className="col-sm-9">
                        <CFormInput type="email" placeholder="Re-enter User Email" id="validationServer05" required onChange={
                          event => setSecondEmail(event.target.value)
                        } />
                        <CFormFeedback invalid>Please check email entered </CFormFeedback>
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className="col-sm-3">
                        <CFormLabel className="col-form-label" >User&#39;s First Name</CFormLabel>
                      </CCol>
                      <CCol className="col-sm-9">
                        <input type="text"
                          className="form-control"
                          placeholder="First Name"
                          onChange={event => setFirstName(event.target.value)}
                          required />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className="col-sm-3">
                        <CFormLabel className="col-form-label" >User&#39;s Last Name</CFormLabel>
                      </CCol>
                      <CCol className="col-sm-9">
                        <input type="Last Name"
                          className="form-control"
                          placeholder="Last Name"
                          onChange={event => setLastName(event.target.value)}
                          required />
                      </CCol>
                    </CRow>
                    <CRow className="mb-3">
                      <CCol className="col-sm-3">
                        <CFormLabel className="col-form-label" >User&#39;s Company ID</CFormLabel>
                      </CCol>
                      <CCol className="col-sm-9">
                        <input type="Company ID"
                          className="form-control"
                          placeholder="Company ID"
                          onChange={event => setCid(event.target.value)}
                          required />
                      </CCol>
                    </CRow>

                    <CRow>
                      <CCol xs={6}>
                        <p className="text-medium-emphasis">Choose new User Role</p>
                        <CInputGroup className="mb-4" onChange={event => setRole(event.target.value)}>
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            value="HR"
                            id="flexRadioDefault1"
                            label="Admin"
                            defaultChecked
                          />
                          <CCol xs={2}></CCol>
                          <CFormCheck
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="EMPLOYEE"
                            label="User"
                          />
                        </CInputGroup>
                        <button className="btn btn-lg btn-primary btn-block" type="submit">
                          Create
                        </button>
                      </CCol>
                    </CRow>
                  </form>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>

      </CContainer>
    </div>
  )
}

export default CreateUser;
