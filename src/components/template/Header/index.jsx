import React, { useState, useEffect } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";

import { BrowserRouter as Router } from 'react-router-dom';

import api from '../../../services/api'

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiData, setApiData] = useState([]);

  function toggleCollapse() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    api.get('/admin/categories/all')
      .then(res => setApiData(res.data))
      .catch(err => console.error(err))
  }, []);

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
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Categorias</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  {apiData.map(categorie => (
                    <MDBDropdownItem key={categorie._id} href={`/categories/${categorie.slug}`}>
                      {categorie.name}
                    </MDBDropdownItem>
                  ))}
                </MDBDropdownMenu>
              </MDBDropdown>
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