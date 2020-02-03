import React, { useState } from 'react';
import { MDBBtn, MDBCollapse, MDBInputGroup } from "mdbreact";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom'

import api from '../../../../../services/api'
import { getUserId } from '../../../../../services/auth'

const DataSettings = ({ history }) => {
  const [collapse, setCollapse] = useState("");
  const [password, setPassword] = useState("");
  const [deleted, setDeleted] = useState(false);

  function toggleCollapse(collapseId) {
    setCollapse(collapseId)
  }

  function handleSubmit(e) {
    e.preventDefault()

    api.delete(`/admin/users/${getUserId()}`, {
      data: { password },
    })
      .then(res => {
        localStorage.clear()
        toast.success(res.data.msg)
        setDeleted(true)
      })
      .catch(err => {
        if (err.response) {
          toast.error(err.response.data.msg)
        } else {
          console.error(err)
        }
      })
  }

  return (
    deleted ? <Redirect to="/signin" /> :
      <div className="my-3 data-settings">
        <h3>Excluir conta</h3>
        <span>
          Tem certeza que deseja deletar a conta? Todos os dados serão perdidos!
      </span>
        <MDBBtn
          color="primary"
          onClick={() => toggleCollapse("passwordForm")}
          className="my-3"
        >
          Confirmar
      </MDBBtn>
        <MDBCollapse id="passwordForm" isOpen={collapse}>
          <form onSubmit={handleSubmit}>
            <MDBInputGroup
              required
              label="Senha"
              style={{ maxWidth: 400 }}
              type="password"
              append={
                <MDBBtn
                  type="submit"
                  className="m-0 px-3 py-2 z-depth-0"
                  color="danger"
                >Excluir</MDBBtn>
              }
              onChange={e => setPassword(e.target.value)}
            >
            </MDBInputGroup>
          </form>
        </MDBCollapse>
      </div>
  )
};

export default DataSettings;
