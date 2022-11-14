import { React, Dropdown, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { NavDropdown } from 'react-bootstrap'
import axios from "axios";
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from 'src/assets/brand/logo'

const AppHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
     const [role, setRole] = useState();
     const getUser="http://localhost:8080/api/user/emp/email/" + localStorage.getItem("username")


        const yourConfig = {
           headers: {
              Authorization: "Bearer " + localStorage.getItem("authorization")
           }
        }


        axios.get(getUser,yourConfig).then(res => {
              var json= res.data;
              setRole(json["userRole"])
              localStorage.setItem("UserRole", json["userRole"].toString());

         });


  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} activeClassName="active">
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/records">Records</CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="/bookings">Bookings</CNavLink>
          </CNavItem>
          <CNavItem>

              {role==="HR"?
                  <NavDropdown title="Admin" id="nav-dropdown">
                    <NavDropdown.Item href="/UserManagement"> User Management </NavDropdown.Item>
                    <NavDropdown.Item href="/admin/news">News Management</NavDropdown.Item>
                    <NavDropdown.Item href="/admin/regulation">Regulation Management</NavDropdown.Item>
                  </NavDropdown>
               :

                <p></p>}
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
