import React, { lazy, useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Axios from 'axios';
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
import CIcon from '@coreui/icons-react';
import * as icon from '@coreui/icons';



const Records = (props) => {
  const [bookingRecords, setRecords] = useState([])
  const [order, setOrder] = useState("ASC");
  const [resultType, setResultType] = useState()

  const yourConfig = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("authorization")
    }
  }
  const del = async (bid) => {
    console.log("Delete function: ", bid, " 12 ", yourConfig);
    var res = Axios.delete(`http://localhost:8080/api/bookings/hr/del/` + bid, yourConfig).then(() => {
      window.location.reload(false);
    })
    console.log((await res).status)
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
  const optionsFunction = (bookingBID) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => del(bookingBID)
        },
        {
          label: 'No'
        }
      ]
    });
  }
  //fetch data when resultType updates
  useEffect(() => {
    const getRecords = async () => {
      const tasksFromServer = await fetchRecords()
      setRecords(tasksFromServer)
    }
    getRecords()
  }, [resultType])

  // Fetch Tasks
  const fetchRecords = async () => {
    var res = ""
    if (resultType === "past") {
      res = await fetch("http://localhost:8080/api/bookings/emp/past/" + localStorage.getItem("username") + "/", yourConfig)
    } else if (resultType === "upcoming") {
      res = await fetch("http://localhost:8080/api/bookings/emp/upcoming/" + localStorage.getItem("username") + "/", yourConfig)
    } else {
      res = await fetch("http://localhost:8080/api/bookings/emp/allEmp/" + localStorage.getItem("username") + "/", yourConfig)
    }
    const data = await res.json()
    console.log(data)
    return data
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong sm={6} md={8}>My Booking Records</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <CButtonGroup role="group" aria-label="Basic checkbox toggle button group">
              <CFormCheck
                onClick={() => setResultType('all')}
                type="radio"
                button={{ color: 'secondary', variant: 'outline' }}
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                label="All"
                defaultChecked
              />
              <CFormCheck
                onClick={() => setResultType('past')}
                type="radio"
                button={{ color: 'secondary', variant: 'outline' }}
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                label="Past"
              />
              <CFormCheck
                onClick={() => setResultType('upcoming')}
                type="radio"
                button={{ color: 'secondary', variant: 'outline' }}
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                label="Upcoming"
              />
            </CButtonGroup>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead color="light">
                <CTableRow>
                  <CTableHeaderCell scope="col" onClick={() => sorting("bid")}>Booking ID &nbsp;&nbsp; <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => sorting("bdate")}>Date &nbsp;&nbsp; <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => sorting("status")}>Status &nbsp;&nbsp; <CIcon icon={icon.cilSwapVertical} size="xxxl" /></CTableHeaderCell>
                  {resultType === "upcoming" ?
                    <CTableHeaderCell scope="col">Actions</CTableHeaderCell> :
                    <CTableHeaderCell scope="col"></CTableHeaderCell>
                  }
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {bookingRecords.map((bookingRecord) => (
                  <CTableRow key={bookingRecord.bid}>
                    <CTableHeaderCell scope="row">{bookingRecord.bid}</CTableHeaderCell>
                    <CTableDataCell>{bookingRecord.bdate}</CTableDataCell>
                    <CTableDataCell>{bookingRecord.status}</CTableDataCell>
                    <CTableDataCell>
                      {resultType === "upcoming" ?
                        <CButton color="dark" variant="ghost"
                          onClick={() => optionsFunction(bookingRecord.bid)}>Cancel</CButton> :
                        <p></p>
                      }
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
