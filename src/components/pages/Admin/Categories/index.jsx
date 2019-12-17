import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import {
  MDBBtn,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBInput,
} from 'mdbreact';

import api from '../../../../services/api'

const Categories = () => {
  const [apiData, setApiData] = useState([])
  const [data, setData] = useState({})
  const [modal, setModal] = useState(false)

  useEffect(() => {
    loadApiData()
  }, []);

  function toggleModal() {
    setModal(!modal)
  }

  /**
   * API
   */
  // Função que carrega dados
  async function loadApiData() {
    await api.get('/admin/categories')
      .then(res => setApiData(res.data))
      .catch(err => console.error(err))
  }

  // Função que limpa campos do formulário e fecha o modal
  function toggleModalAndClearFields() {
    toggleModal()

    setData({ _id: '', name: '', slug: '' })
  }

  // Função que salva ou atualiza dados
  async function saveData() {
    const { _id } = data

    const method = _id ? 'put' : 'post'
    const url = _id ? `/admin/categories/${_id}` : `/admin/categories`

    await api[method](url, data)
      .then(req => {
        loadApiData()
        toast.success(req.data.msg)
      })
      .catch(err => console.error(err))
  }

  // Função que carrega os dados no formulário
  async function loadOnForm(id) {
    await api.get(`/admin/categories/${id}`)
      .then(res => {
        setData(res.data)
        toggleModal()
      })
      .catch(err => console.error(err))
  }

  // Função que deleta dados
  async function deleteData(id) {
    await api.delete(`/admin/categories/${id}`)
      .then(req => {
        loadApiData()
        toast.success(req.data.msg)
      })
      .catch(err => console.error(err))
  }

  // Função que lida com o submit
  function handleSubmit(e) {
    e.preventDefault() // evita que a página atualize. Prevent Default -> previnir padrão
    if (!data) return

    saveData(e)

    toggleModalAndClearFields()
  }

  /**
   * Render components
   */
  function renderRows() {
    return (
      apiData.map(apiData => (
        <tr key={apiData._id}>
          <td>{apiData.name}</td>
          <td>{apiData.slug}</td>
          <td>{apiData.updatedAt}</td>
          <td>
            <MDBBtn
              className="px-3 mr-0"
              color="primary"
              onClick={() => loadOnForm(apiData._id)}
            >
              <i className="fas fa-pen" style={{ fontSize: "1.2em" }} />
            </MDBBtn>

            <MDBBtn
              className="px-3"
              color="danger"
              onClick={() => deleteData(apiData._id)}
            >
              <i className="fas fa-trash" style={{ fontSize: "1.2em" }} />
            </MDBBtn>
          </td>
        </tr>
      ))
    )
  }

  function renderTable() {
    if (!apiData) {
      return (
        <center>
          <h3 className="mt-3">Nenhuma categoria registrada</h3>
        </center>
      )
    } else {
      return (
        <MDBTable striped responsive className="mt-3">
          <MDBTableHead>
            <tr>
              <th>Nome</th>
              <th>Slug</th>
              <th>Criação ou atualização</th>
              <th>Ações</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {renderRows()}
          </MDBTableBody>
        </MDBTable>
      )
    }
  }

  function renderModal() {
    return (
      <MDBModal isOpen={modal} toggle={toggleModalAndClearFields}    >
        <MDBModalHeader toggle={toggleModalAndClearFields}>
          {data._id ?
            <span className="text-primary">
              <i className="fas fa-pen" /> Editar categoria
            </span> :
            <span className="text-success">
              <i className="fas fa-plus" /> Nova categoria
            </span>
          }
        </MDBModalHeader>

        <form onSubmit={handleSubmit}>
          <MDBModalBody>
            {/* {data._id && <MDBInput type="hidden" value={data._id} />} */}

            <MDBInput
              value={data.name}
              onChange={e => setData({ ...data, name: e.target.value })}
              label="Nome da categoria"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
            />

            <MDBInput
              value={data.slug}
              onChange={e => setData({ ...data, slug: e.target.value })}
              label="Slug da categoria"
              group
              type="text"
              validate
              error="wrong"
              success="right"
              required
            />
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn
              color="danger"
              onClick={toggleModalAndClearFields}
            >
              Cancelar
            </MDBBtn>

            <MDBBtn
              color="success"
              type="submit"
            >
              {data._id ? "Salvar Alterações" : "Salvar"}
            </MDBBtn>
          </MDBModalFooter>
        </form>
      </MDBModal>
    )
  }

  /**
   * Render main
   */
  return (
    <div className="categories mt-5">
      <h1 className="display-3">Categorias</h1>

      <hr />

      <MDBBtn className="px-3" color="success" onClick={toggleModal}>
        <i className="fas fa-plus" /> Nova categoria
      </MDBBtn>

      {renderModal()}
      {renderTable()}
    </div>
  )
}

export default Categories;