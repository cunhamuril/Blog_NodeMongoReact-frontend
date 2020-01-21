import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBBtn,
} from "mdbreact";
import { toast } from 'react-toastify'

import api from '../../../../services/api'

const Signup = ({ history }) => {
  const [userData, setUserData] = useState({});

  function saveData() {
    api.post('/admin/users', userData)
      .then(res => {
        toast.success(res.data.msg)
        history.push('/signin')
      })
      .catch(err => {
        toast.error(err.response.data.msg)
        console.error(err)
      })
  }

  function handleSubmit(e) {
    e.preventDefault()

    saveData()
  }

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <MDBCard style={{ width: 500 }}>
        <MDBCardHeader color="blue-gradient" className="d-flex align-items-center justify-content-center">
          <h3 className="light-text mt-3"><MDBIcon icon="user-plus" /> Cadastro</h3>
        </MDBCardHeader>
        <MDBCardBody>
          <form onSubmit={handleSubmit} className="grey-text">
            <MDBInput
              label="Nome"
              group
              success="right"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
              required
            />
            <MDBInput
              label="Nome de usuário"
              group
              success="right"
              value={userData.username}
              onChange={e => setUserData({ ...userData, username: e.target.value })}
              required
            />
            <MDBInput
              label="E-mail"
              group
              success="right"
              value={userData.email}
              onChange={e => setUserData({ ...userData, email: e.target.value })}
              required
            />
            <MDBInput
              label="Senha"
              type="password"
              group
              value={userData.password}
              onChange={e => setUserData({ ...userData, password: e.target.value })}
              required
            />
            <MDBInput
              label="Confirmar senha"
              type="password"
              group
              value={userData.confirmPassword}
              onChange={e => setUserData({ ...userData, confirmPassword: e.target.value })}
              required
            />
            <MDBBtn
              type="submit"
              block
              color="blue"
            >Salvar</MDBBtn>
          </form>
          <div className="mt-3 text-muted text-center">
            <small>
              Já tem cadastro? <a href="/signin">Faça login</a>
            </small>
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
};

export default Signup;