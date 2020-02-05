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

import Loading from '../../template/Loading'

import api from '../../../services/api'

const SearchPost = ({ match, history }) => {
  const [apiData, setApiData] = useState([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState({})

  useEffect(() => {
    loadApiData()
    // eslint-disable-next-line
  }, [])

  function loadApiData() {
    api.get(`/posts/search?value=${match.params.value}`)
      .then(res => {
        setApiData(res.data)
        setLoading(false)
      })
      .catch(err => {
        const { response } = err

        console.error(response)

        if (response.status === 404) setNotFound(response.data)
        else history.push("/")
        setLoading(false)
      })
  }

  function renderCards() {
    return (
      apiData.map(post => (
        <MDBCard key={post._id} className="mt-4" style={{ width: '100%', maxWidth: '800px' }}>

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
                      color="red accent-4"
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
      <h1 className="display-3">Pesquisa</h1>

      <hr />

      <div className="d-flex flex-column justify-content-center align-items-center">
        {loading ? <Loading /> : renderCards()}
        {notFound ? <h3 className="mt-5">{notFound.msg}</h3> : renderCards()}
      </div>


      <br />
    </div>
  )
};

export default SearchPost;



