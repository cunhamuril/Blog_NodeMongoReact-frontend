import React from 'react';
import {
  MDBCard,
  MDBCardBody
} from "mdbreact";

import './styles.css'

const Admin = () => {

  function renderCard(title, qtdy, color, icon) {
    return (
      <MDBCard
        className="mr-3 px-3 py-1 my-2 dashboard-card"
      >
        <MDBCardBody>
          <h4 className={`text-${color}`}>
            <i className={`${icon}`}></i> &nbsp; {title}
          </h4>
          <hr />
          <h1 className={`text-${color}`}>{qtdy}</h1>
        </MDBCardBody>
      </MDBCard>
    )
  }

  return (
    <div className="home-admin mt-5">
      <h1 className="display-3">Dashboard</h1>

      <hr />

      <div className="d-flex mt-5 flex-wrap">
        <a href="/admin/categories">
          {renderCard('Categorias', '10', 'success', 'fab fa-buffer')}
        </a>

        <a href="/admin">
          {renderCard('Postagens', '10', 'primary', 'fas fa-file')}
        </a>
      </div>

    </div>
  )
}

export default Admin;
