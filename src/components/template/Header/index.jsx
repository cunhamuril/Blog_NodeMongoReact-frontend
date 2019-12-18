import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  // MDBFormInline,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

import { BrowserRouter as Router } from 'react-router-dom';

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleCollapse() {
    setIsOpen(!isOpen)
  }

  return (
    <Router>
      <MDBNavbar color="blue-gradient" light expand="md">
        <MDBNavbarBrand>
          <a href="/">
            <strong
              className="dark-text"
              style={{
                color: "#000",
                fontFamily: "'Shadows Into Light', cursive",
                fontSize: "1.5em"
              }}
            >
              exBlog
            </strong>
          </a>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>

          <MDBNavbarNav left>
            <MDBNavItem>
              <a className="nav-link" href="/">Home</a>
            </MDBNavItem>

            <MDBNavItem>
              <a className="nav-link" href="#!">Categorias</a>
            </MDBNavItem>
          </MDBNavbarNav>

          <MDBNavbarNav right>
            {/* <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                </div>
              </MDBFormInline>
            </MDBNavItem> */}

            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Admin</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/admin">Dashboard</MDBDropdownItem>
                  <MDBDropdownItem href="/admin/categories">Categorias</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Postagens</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
}

export default NavbarPage;