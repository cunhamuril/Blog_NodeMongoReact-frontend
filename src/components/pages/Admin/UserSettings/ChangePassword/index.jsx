import React, { useState } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact'
import { toast } from "react-toastify";

import api from '../../../../../services/api'

const ChangePassword = () => {
  const [userData, setUserData] = useState({});

  const { EXBLOG_USER_ID, EXBLOG_TOKEN } = localStorage

  function handleSubmit(e) {
    e.preventDefault()

    api.patch(`/admin/users/${EXBLOG_USER_ID}`, userData, {
      headers: { Authorization: `Bearer ${EXBLOG_TOKEN}` }
    })
      .then(res => {
        toast.success(res.data.msg)
        setUserData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      })
      .catch(err => {
        toast.error(err.response.data.msg)
        console.error(err)
      })
  }

  return (
    <div className="my-3 data-settings">
      <h3>Alterar senha</h3>
      <form onSubmit={handleSubmit}>
        <MDBInput
          label="Senha atual"
          type="password"
          required
          value={userData.currentPassword}
          onChange={e => setUserData({ ...userData, currentPassword: e.target.value })}
        />
        <MDBInput
          label="Nova senha"
          type="password"
          required
          value={userData.newPassword}
          onChange={e => setUserData({ ...userData, newPassword: e.target.value })}
        />
        <MDBInput
          label="Confirmar nova senha"
          type="password"
          required
          value={userData.confirmPassword}
          onChange={e => setUserData({ ...userData, confirmPassword: e.target.value })}
        />
        <MDBBtn type="submit" color="blue">Salvar alterações</MDBBtn>
      </form>
    </div>
  )
};

export default ChangePassword;
