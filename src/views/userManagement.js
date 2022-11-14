import React, { lazy, useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormCheck,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Records = (props) => {
  const [bookingRecords, setRecords] = useState([])
  const [order, setOrder] = useState("ASC");
  const [resultType, setResultType] = useState()
  const history = useHistory();
  const [name, setName] = useState()


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

  //fetch data when resultType updates
  useEffect(() => {
    const getRecords = async () => {
      console.log("Hello")
      const tasksFromServer = await fetchRecords()
      console.log(tasksFromServer)
      // setRecords(tasksFromServer)
    }
    getRecords()
  }, [resultType])
  // Fetch Tasks
  const fetchRecords = async () => {
    console.log("Hello2");
    const getUser = "http://localhost:8080/api/user/hr/";

    const yourConfig = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("authorization")
      }
    }

    axios.get(getUser, yourConfig).then(res => {
      console.log("Hello3");
      var json = res.data;
      setRecords(json);

    });
  }

  function onDelete() {
    alert("deleting user");

  };
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong sm={6} md={8}>User Records</strong>&nbsp;&nbsp;Click on the user emails to view their booking records.
            <CButton style={{ float: "right" }}
              color="light"
              onClick={(event) => { history.push("/CreateUser")}}>
              Create New User
            </CButton>
          </CCardHeader>
          <CCardBody>

            <CTable>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col" onClick={() => sorting("email")}>User Email </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => sorting("fname")}>First name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => sorting("lname")}> Last Name </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => sorting("userRole")}> Role </CTableHeaderCell>
                  <CTableHeaderCell scope="col" >Action</CTableHeaderCell>

                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bookingRecords.map((bookingRecord) => (
                  <CTableRow key={bookingRecord.bid}>
                    <CTableHeaderCell scope="row"
                      onClick={(event) => {
                        const email = bookingRecord.email
                        history.push({
                          pathname: "/UserDetails",
                          search: '?query=abc',
                          state: { username: email }
                        })
                      }
                      }>{bookingRecord.email}
                    </CTableHeaderCell>
                    <CTableDataCell>{bookingRecord.fname}</CTableDataCell>
                    <CTableDataCell>{bookingRecord.lname}</CTableDataCell>
                    <CTableDataCell>{bookingRecord.userRole}</CTableDataCell>
                    <CTableDataCell>
                      <CCol>
                        <button className="btn btn-sm btn-primary btn-block"
                          onClick={(event) => {
                            const email = bookingRecord.email
                            history.push({
                              pathname: "/UserDetails",
                              search: '?query=abc',
                              state: { username: email }
                            })
                          }
                          }
                        >
                          Edit
                        </button>
                      </CCol>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Records
