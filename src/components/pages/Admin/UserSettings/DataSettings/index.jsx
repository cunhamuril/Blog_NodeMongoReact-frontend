import React, { useState, useEffect } from 'react';
import { MDBInput, MDBBtn } from 'mdbreact'
import { toast } from "react-toastify";

import Loading from '../../../../template/Loading'

import api from '../../../../../services/api'
import { getUserId } from '../../../../../services/auth'

const DataSettings = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function loadUserData() {
      api.get(`/admin/users/${getUserId()}`)
        .then(res => {
          setUserData(res.data)
          setLoading(false)
        })
        .catch(err => console.error(err))
    }

    loadUserData()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()

    api.patch(`/admin/users/${getUserId()}`)
      .then(res => {
        toast.success(res.data.msg)
      })
      .catch(err => {
        toast.error(err.response.data.msg)
        console.error(err)
      })
  }

  return (
    loading ? <Loading /> :
      <div className="my-3 data-settings">
        <h3>Alterar dados da conta</h3>
        <form onSubmit={handleSubmit}>
          <MDBInput
            label="Nome"
            required
            value={userData.name}
            onChange={e => setUserData({ ...userData, name: e.target.value })}
          />
          <MDBInput
            label="Nome de usuário"
            required
            value={userData.username}
            onChange={e => setUserData({ ...userData, username: e.target.value })}
          />
          <MDBInput
            label="E-mail"
            required
            value={userData.email}
            onChange={e => setUserData({ ...userData, email: e.target.value })}
          />
          <MDBBtn type="submit" color="blue">Salvar alterações</MDBBtn>
        </form>
      </div>
  )
};

export default DataSettings;
