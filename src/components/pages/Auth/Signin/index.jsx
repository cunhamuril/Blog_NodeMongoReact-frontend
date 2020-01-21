import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdbreact";

import { toast } from "react-toastify";
import { Redirect } from "react-router";

import api from '../../../../services/api'
import verifyToken from '../../../../utils/verifyToken'

const Signin = () => {
  const [userData, setUserData] = useState({});
  const [logged, setLogged] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()

    api.post('/admin/signin', userData)
      .then(async res => {
        localStorage.setItem('EXBLOG_TOKEN', res.data.token)
        localStorage.setItem('EXBLOG_USER_ID', res.data.user_id)

        /**
         * Como não estou utilizando o Redux ainda, fiz uma "gambiarra" aqui:         
         * Cada vez que chamar esta função, deverá ser criado um state 
         * logged para renderizar a página admin
         */
        verifyToken()
        setLogged(await verifyToken())
      })
      .catch(err => {
        toast.error(err.response.data.msg)
        console.error(err)
      })
  }

  return (
    logged ? <Redirect to="/admin" /> :
      <div className="d-flex justify-content-center align-items-center mt-5">
        <MDBCard style={{ width: 500 }}>
          <MDBCardHeader color="blue-gradient" className="d-flex align-items-center justify-content-center">
            <h3 className="light-text mt-3"><MDBIcon icon="user" /> Login</h3>
          </MDBCardHeader>
          <MDBCardBody>
            <form onSubmit={handleSubmit} className="grey-text">
              <MDBInput
                label="E-mail ou nome de usuário"
                icon="envelope"
                group
                required
                value={userData.username}
                onChange={e => setUserData({ ...userData, username: e.target.value })}
              />
              <MDBInput
                label="Senha"
                icon="lock"
                type="password"
                group
                required
                value={userData.password}
                onChange={e => setUserData({ ...userData, password: e.target.value })}
              />
              <MDBBtn
                type="submit"
                block
                color="blue"
              >Entrar</MDBBtn>
            </form>
            <div className="mt-3 text-muted text-center">
              <small>
                Não tem conta? <a href="/signup">Cadastre-se!</a>
              </small>
            </div>
          </MDBCardBody>
        </MDBCard>
      </div>
  )
};

export default Signin;