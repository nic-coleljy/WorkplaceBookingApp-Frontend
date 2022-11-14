import React, { Component,useState } from "react";
import axios from "axios";
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'
import {useHistory} from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { Link } from 'react-router-dom'
import  { lazy } from 'react'
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
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
//import createHistory from 'history/createBrowserHistory';

//const history=createBrowserHistory({forceRefresh:true});


function CheckIn(props){
const history= useHistory();

//
   const [Temperature, setTemperature] = useState();
   const [Symptoms, setHealth] = useState();
   const[user,setUser]= useState();

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;


   const handleFormSubmit = event => {
       event.preventDefault();
       const dailyForm = "http://localhost:8080/api/dailyForm/emp/new";
       const dateTime= new Date().toISOString().substring(0,10);
        const yourConfig = {
           headers: {
              Authorization: "Bearer " + localStorage.getItem("authorization")
           }
        }

       const DailyForm_Object = {
          temperature:Temperature,
          symptoms:Symptoms,
          user: {
            "email": localStorage.getItem("username")
          },
          dateTime:dateTime

      };

      axios.post(dailyForm,DailyForm_Object,yourConfig).then(res =>{

          history.push("/dashboard");

      });

   };



   return (
    <div className="bg-white min-vh-100 d-flex flex-row align-items-center">
     <CContainer>
       <CRow className="justify-content-center">
         <CCol md={6}>
           <CCardGroup>
             <CCard className="p-4">
               <CCardBody>
                 <CForm className="form-signin" onSubmit={handleFormSubmit}>
                   <h1>Daily Check-in Form </h1>
                   <p className="text-medium-emphasis">Submit to check-in for { date }</p>
                   <CInputGroup className="mb-3">
                     <input type="text"
                      className="form-control"
                      placeholder="Temperature"
                      onChange={event => setTemperature(event.target.value)}
                  required/>
                   </CInputGroup>
                   <CInputGroup className="mb-4">
                       <p className="text-medium-emphasis">Do you have any of the following
                        symptoms within the last 14 days: cough, smell, taste impairment, fever,
                        breathing difficulties, body aches, headaches, fatigue, sore throat, diarrhoea, and/or runny nose
                        (even if your symptoms are mild)
                       </p>
                        <div   onChange={event => setHealth(event.target.value)}>
                              <input type="radio" value="true" name="gender" /> True  &nbsp;
                              <input type="radio" value="false" name="gender" /> False

                       </div>



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
 export default CheckIn;
//  onChange={event => setTemperature(event.target.value)}
