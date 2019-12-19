import React, { useState } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
} from "mdbreact";

import { BrowserRouter as Router } from 'react-router-dom';

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false)

  function toggleCollapse() {
    setIsOpen(!isOpen)
  }

  return (
    <Router>
      <MDBNavbar className="header" color="blue-gradient" light expand="md">
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
            <MDBNavItem>
              <a className="nav-link" href="/admin">Admin</a>
            </MDBNavItem>

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    </Router>
  );
}

export default NavbarPage;