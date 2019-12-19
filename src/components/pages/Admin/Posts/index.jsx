import React, { useState, useEffect } from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBRow,
  MDBCol,
  MDBCardFooter,
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
} from 'mdbreact';
import { toast } from "react-toastify";

import './styles.css'

import Pagination from '../../../template/Pagination'
import Loading from '../../../template/Loading'

import api from '../../../../services/api'

const Posts = () => {
  const [apiData, setApiData] = useState([])
  const [apiInfo, setApiInfo] = useState({})
  const [page, setPage] = useState(1)
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(true)
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    loadApiData(page)
  }, [page])

  function toggleModal(id) {
    setModal(!modal)
    setPostId(id)
  }

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

  function deletePost(id) {
    api.delete(`/admin/posts/${id}`)
      .then(res => {
        toast.success(res.data.msg)
        loadApiData()
      })
      .catch(err => console.error(err))
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
                  <small className="text-muted">Slug: {post.slug}</small>
                </div>
              </MDBCol>
            </MDBRow>

            <MDBRow className="d-flex justify-content-end align-items-end">
              <MDBBtn
                color="primary px-4"
                href={`/admin/posts/edit/${post._id}`}
              >
                <i className="fas fa-pen" />
              </MDBBtn>
              <MDBBtn
                color="danger px-4"
                onClick={() => toggleModal(post._id)}
              >
                <i className="fas fa-trash" />
              </MDBBtn>
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

  function renderModal() {
    return (
      <MDBModal isOpen={modal} toggle={toggleModal}    >
        <MDBModalHeader toggle={toggleModal}>
          <span className="text-danger">
            <i className="fas fa-trash" /> Excluir postagem
          </span>
        </MDBModalHeader>

        <MDBModalBody>
          <span>
            Tem certeza que deseja excluir a postagem? Todos os dados serão perdidos!
            </span>
        </MDBModalBody>

        <MDBModalFooter>
          <MDBBtn
            color="primary"
            onClick={() => {
              setPostId(null)
              toggleModal()
            }}
          >
            Cancelar
            </MDBBtn>

          <MDBBtn
            color="danger"
            type="submit"
            onClick={() => {
              deletePost(postId)
              toggleModal()
            }}
          >
            Excluir
            </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    )
  }

  console.log(postId)

  return (
    <div className="posts mt-5">
      {renderModal()}

      <h1 className="display-3">Postagens</h1>

      <hr />

      <MDBBtn
        className="px-3 mb-2 mt-5"
        color="success"
        href="/admin/posts/new"
      >
        <i className="fas fa-plus" /> Nova postagem
      </MDBBtn>

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

export default Posts;
