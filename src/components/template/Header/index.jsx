import React, { useState, useEffect } from "react"
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
  MDBDropdownItem,
  MDBFormInline,
  MDBIcon,
} from "mdbreact";

import { BrowserRouter as Router } from 'react-router-dom';

import api from '../../../services/api'
import verifyToken from '../../../utils/verifyToken'

const { IS_LOGGED } = localStorage

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [apiData, setApiData] = useState([]);
  const [search, setSearch] = useState("");
  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState(false);

  function toggleCollapse() {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    api.get('/admin/categories/all')
      .then(res => setApiData(res.data))
      .catch(err => console.error(err))
  }, []);

  useEffect(() => {
    loadUserData()
  }, [])

  useEffect(() => {
    async function isLogged() {
      setLogged(await verifyToken())
    }

    isLogged()
  }, [])

  function loadUserData() {
    if (IS_LOGGED) {
      const { EXBLOG_USER_ID, EXBLOG_TOKEN } = localStorage

      api.get(`/admin/users/${EXBLOG_USER_ID}`, {
        headers: { Authorization: `Bearer ${EXBLOG_TOKEN}` }
      })
        .then(res => setUserData(res.data))
        .catch(err => console.error(err))
    }
  }

  function handleSearch(e) {
    e.preventDefault();

    document.location.pathname = `/posts/search/${search}`
  }

  return (
    <Router>
      <MDBNavbar className="header" color="blue-gradient" light expand="md">
        <div className="container">
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
                <MDBFormInline waves onSubmit={handleSearch}>
                  <div className="md-form my-0">
                    <input
                      type="text"
                      className="form-control mr-sm-2"
                      placeholder="Pesquisar postagens"
                      aria-label="Pesquisar postagens"
                      onChange={e => setSearch(e.target.value)}
                      value={search}
                    />
                  </div>
                </MDBFormInline>
              </MDBNavItem>

              {logged ? (
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <span className="mr-2"><MDBIcon icon="user" /> {userData.username}</span>
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem href="/admin">
                        Painel de Controle
                    </MDBDropdownItem>
                      <MDBDropdownItem
                        onClick={() => {
                          localStorage.clear()
                          setLogged(false)
                        }}
                        href={
                          document.location.pathname.match(/\/[admin/. admin]/) ?
                            "/signin" : "#!"
                        }
                      >
                        Sair
                    </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              ) : (
                  <MDBNavItem>
                    <a className="nav-link" href="/signin">Login</a>
                  </MDBNavItem>
                )
              }
            </MDBNavbarNav>
          </MDBCollapse>
        </div>
      </MDBNavbar>
    </Router>
  );
}

export default NavbarPage;