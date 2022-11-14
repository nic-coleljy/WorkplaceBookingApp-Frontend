import React, { Component, useState } from "react";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { lazy, useEffect } from 'react'
import axios from "axios";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'
import { useLocation } from "react-router-dom";
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
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CFormSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';



function UserDetails(props) {
  const history = useHistory();
  const [person, setPerson] = useState();
  const [fname, setFirstName] = useState();
  const [lname, setLastName] = useState();
  const [role, setRole] = useState();
  const [fullName, setFullName] = useState();
  const [bookingRecords, setRecords] = useState([])
  const [formRecords, setFormRecords] = useState([])
  const [order, setOrder] = useState("ASC");
  const [email, setEmail] = useState();

  const [resultType, setResultType] = useState()
  const [formOrder, setFormOrder] = useState("ASC");
  const location = useLocation();


  const [validated, setValidated] = useState(false)

  const yourConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authorization")
    }
  }


  //sort function
  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...bookingRecords].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      );
      setRecords(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...bookingRecords].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
      );
      setRecords(sorted);
      setOrder("ASC");
    }
  }

  //sort function
  const formSorting = (col) => {
    if (order === "ASC") {
      const sorted = [...bookingRecords].sort((a, b) =>
        a[col].toString().toLowerCase() > b[col].toString().toLowerCase() ? 1 : -1
      );
      setFormRecords(sorted);
      setFormOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...bookingRecords].sort((a, b) =>
        a[col].toString().toLowerCase() < b[col].toString().toLowerCase() ? 1 : -1
      );
      setFormRecords(sorted);
      setFormOrder("ASC");
    }
  }


  useEffect(() => {
    const getRecords = async () => {
      const tasksFromServer = await fetchRecords()
      const tasksFromServer2 = await fetchFormRecords()
    }
    getRecords()

  }, [resultType])

  // Fetch Tasks
  const fetchRecords = async () => {
    var res = ""
    const getUserBookings = 'http://localhost:8080/api/bookings/UserBookings/' + location.state.username
    const getUser = "http://localhost:8080/api/user/emp/email/" + location.state.username

    axios.get(getUser, yourConfig).then(res => {
      var json = res.data;
      console.log(json)
      setFirstName(json["fname"])
      setLastName(json["lname"])
      setFullName(fname + " " + lname)
      setRole(json["userRole"])
      setEmail(json["email"])
      var x = json["vaccinated"]
      console.log("This is a test ", x)
      if (json["vaccinated"] == true) { setVax("Vaccinated"); console.log("Im confused"); console.log("Vax is now ", vax) }
      else setVax("Not Vaccinated")
      console.log("Vax is now ", vax)
      console.log(vax === "vaccinated")
      if (json["vaccinated"] == true) console.log("Hi")
      else console.log("bye")
    });

    axios.get(getUserBookings, yourConfig).then(res => {
      var json = res.data;
      setRecords(json);
    });
  }

  const fetchFormRecords = async () => {
    var res = ""
    const getUserForm = 'http://localhost:8080/api/dailyForm/hr/user/' + location.state.username;
    axios.get(getUserForm, yourConfig).then(res => {

      var json = res.data;
      setFormRecords(json);

    });
  }

  //vax
  const [vax, setVax] = useState("Not Vaccinated");
  const [curVax, setCurVax] = useState();

  //update vax
  const handleVaxFormSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget

    const getUser = "http://localhost:8080/api/user/emp/email/" + location.state.username
    const yourConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization")
      }
    }
    const endpoint = "http://localhost:8080/api/user/hr/new/vaccination/" + curVax;
    var currVax = false;
    (curVax === "false") ? currVax = true : currVax = false;
    if (vax === currVax) {
      alert('No Changes Made')
    };
    const user_object = {
      email: location.state.username,
      fname: fname,
      lname: lname,
      vaccinated: currVax,
      password: localStorage.getItem("authorization"),
      userRole: role,
    };
    console.log("asdasd", user_object)
    axios.put(endpoint, user_object, yourConfig).then(res => { history.push("/Dashboard") });
  };

  //del user

  const delConfig = {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authorization")
    }
  }
  const del = async (userEmail) => {
    console.log(userEmail)
    var res = await fetch("http://localhost:8080/api/user/hr/email/" + location.state.username + "/", delConfig).then(res => { history.push("/UserManagement") })
  }

  // del confirmation
  const optionsFunction = (email) => {
    confirmAlert({
      title: 'Confirm to delete user',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => del(email)
        },
        {
          label: 'No'
        }
      ]
    });
  }

  return (
    <div className="bg-white min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CRow className="mb-3">
                    <h1 className="col-sm-4"> {fname} {lname} </h1>
                    <CFormLabel className="col-sm-6 col-form-label"></CFormLabel>
                    <CButton className="col-sm-2" color="danger"
                      onClick={() => optionsFunction(location.state.username)}>
                      Delete
                    </CButton>
                  </CRow>
                  <CRow className="mb-3">
                    <CFormLabel className="col-sm-2 col-form-label">Registered Email :</CFormLabel>
                    <CFormLabel className="col-sm-3 col-form-label">{location.state.username}</CFormLabel>
                    <CFormLabel className="col-sm-1 col-form-label">Role :</CFormLabel>
                    <CFormLabel className="col-sm-1 col-form-label">{role}</CFormLabel>
                    <CFormLabel className="col-sm-3 col-form-label">Vaccination Status :</CFormLabel>
                    <CFormLabel className="col-sm-2 col-form-label">{vax}</CFormLabel>
                  </CRow>
                  <hr className="mt-0" />
                  {vax === "Not Vaccinated" ?
                    <CRow className="mb-3">
                      <CForm onSubmit={handleVaxFormSubmit}>
                        <CRow>
                          <CCol className="col-sm-3">
                            <CFormLabel className="col-form-label" >Update Vaccination Status</CFormLabel>
                          </CCol>
                          <CCol className="col-sm-7">
                            <CInputGroup>
                              <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="false"
                                label="Not Vaccinated"
                                onChange={event => setCurVax(event.target.value)}
                              />
                              <CCol xs={2}></CCol>
                              <CFormCheck
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                value="true"
                                label="Vaccinated"
                                onChange={event => setCurVax(event.target.value)}
                              />
                            </CInputGroup>
                          </CCol>
                          <CCol className="col-sm-2">
                            <CButton type="submit" class="btn btn-secondary">Update Status</CButton>
                          </CCol>
                        </CRow>
                      </CForm>
                    </CRow>
                    :<br></br>
                  }
                  <hr className="mt-0" />
                  <CTable>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell scope="col" onClick={() => sorting("bid")}> Booking ID <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                        <CTableHeaderCell scope="col" onClick={() => sorting("bdate")}>Date<CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                        <CTableHeaderCell scope="col" onClick={() => sorting("status")}> Status <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>

                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {bookingRecords.map((bookingRecord) => (
                        <CTableRow key={bookingRecord.bid}>
                          <CTableHeaderCell scope="row">{bookingRecord.bid}</CTableHeaderCell>
                          <CTableDataCell>{bookingRecord.bdate}</CTableDataCell>
                          <CTableDataCell>{bookingRecord.status}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                  <CTable>
                    <CTableHead color="dark">
                      <CTableRow>
                        <CTableHeaderCell scope="col" onClick={() => sorting("fid")}> Form ID <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                        <CTableHeaderCell scope="col" onClick={() => sorting("dateExactTime")}>Date<CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                        <CTableHeaderCell scope="col" onClick={() => sorting("symptoms")}> Symtpoms<CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                        <CTableHeaderCell scope="col" onClick={() => sorting("temperature")}> Temperature <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {formRecords.map((formRecord) => (
                        <CTableRow key={formRecord.fid}>
                          <CTableHeaderCell scope="row">{formRecord.fid}</CTableHeaderCell>
                          <CTableHeaderCell scope="row">{formRecord.dateExactTime}</CTableHeaderCell>
                          <CTableDataCell>{formRecord.symptoms.toString()}</CTableDataCell>
                          <CTableDataCell>{formRecord.temperature}</CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>


                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>

        </CRow>

      </CContainer>
    </div>
  )
}


export default UserDetails;
