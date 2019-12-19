import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody
} from "mdbreact";

import './styles.css'

import api from '../../../services/api'

import Loading from '../../template/Loading'

const Admin = () => {
  const [categoriesQtd, setCategoriesQtd] = useState(null)
  const [postsQtd, setPostsQtd] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApiData()
  }, [])

  function loadApiData() {
    api.get('/admin/categories')
      .then(res => setCategoriesQtd(res.data.totalDocs))
      .catch(err => console.error(err))

    api.get('/admin/posts')
      .then(res => {
        setPostsQtd(res.data.totalDocs)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

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

      {loading ? <Loading /> :
        <div className="d-flex mt-5 flex-wrap">
          <a href="/admin/categories">
            {renderCard('Categorias', categoriesQtd, 'success', 'fab fa-buffer')}
          </a>

          <a href="/admin/posts">
            {renderCard('Postagens', postsQtd, 'primary', 'fas fa-file')}
          </a>
        </div>
      }

    </div>
  )
}

export default Admin;
