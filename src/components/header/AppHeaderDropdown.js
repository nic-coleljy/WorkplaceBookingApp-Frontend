import React, { Component,useState } from "react";
import axios from "axios";
import {
  CAvatar,
  CBadge,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilBell,
  cilCreditCard,
  cilCommentSquare,
  cilEnvelopeOpen,
  cilFile,
  cilLockLocked,
  cilSettings,
  cilTask,
  cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'


const AppHeaderDropdown = () => {
   const [fname, setFirstName] = useState();
   const [lname, setLastName] = useState();

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
  });

  function onDelete(){
  alert("logging out")
      localStorage.clear();
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <b><h5>Welcome, {fname}&nbsp;{lname} <CIcon icon={cilSettings} className="me-2" /></h5></b>
      </CDropdownToggle>
       <CDropdownMenu className="pt-0" placement="bottom-end">
              <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
              <CDropdownItem href="/profile">
                <CIcon icon={cilBell} className="me-2" />
                Profile
              </CDropdownItem>
              <CDropdownItem onClick={onDelete}  href="/Login">
                <CIcon icon={cilLockLocked} className="me-2"  />
                Log Out
              </CDropdownItem>
       </CDropdownMenu>

    </CDropdown>
  )
}

export default AppHeaderDropdown

