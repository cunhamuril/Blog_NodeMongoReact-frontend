import React, { useState, useEffect } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBBtn,
} from 'mdbreact';

import Pagination from '../../template/Pagination'
import Loading from '../../template/Loading'

import api from '../../../services/api'

const Home = () => {
  const [apiData, setApiData] = useState([])
  const [apiInfo, setApiInfo] = useState({})
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    loadApiData(page)
  }, [page])

  function loadApiData(page) {
    api.get(`/admin/posts?page=${page}`)
      .then(res => {
        const { docs, ...apiInfo } = res.data

        setApiData(docs)
        setApiInfo(apiInfo)
        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  function renderCards() {
    return (
      apiData.map(post => (
        <MDBCard
          key={post._id}
          className="mt-4 text-dark"
          style={{
            width: '100%',
            maxWidth: '800px',
          }}
        >

          <MDBCardHeader>
            <small className="text-muted">{post.category.name}</small>
          </MDBCardHeader>

          <MDBCardBody className="p-3">
            <MDBRow>
              <MDBCol sm="12" md="5">
                <img
                  src={post.thumbnail_url}
                  alt="Thumbnail"
                  width="100%"
                />
              </MDBCol>
              <MDBCol sm="12" md="7">
                <div className="mt-2">
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                  <div className="d-flex align-items-center justify-content-center">
                    <MDBBtn
                      color="red"
                      href={`/post/${post.slug}`}
                    >
                      Saiba mais
                  </MDBBtn>
                  </div>
                </div>
              </MDBCol>
            </MDBRow>


          </MDBCardBody>

          <MDBCardFooter>
            <small className="text-muted">
              Data da publicação: {post.date}
            </small>
          </MDBCardFooter>

        </MDBCard>
      ))
    )
  }

  return (
    <div className="posts mt-5">
      <h1 className="display-3 text-secondary-custom">Bem vindo ao Blog</h1>

      <hr />

      <div className="d-flex flex-column justify-content-center align-items-center">
        {loading ? <Loading /> : renderCards()}
      </div>

      <br />

      {(loading || apiData.length === 0 || apiInfo.totalPages <= 1) ? null :
        <Pagination page={page} dataInfo={apiInfo} setPage={setPage} />
      }
    </div>
  )
};

export default Home;



