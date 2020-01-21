import React, { useState, useMemo, useEffect } from 'react';
import {
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdbreact';
import { toast } from "react-toastify";
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import './styles.css'

import Loading from '../../../../template/Loading'

import api from '../../../../../services/api'

const NewPost = ({ history, match }) => {
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailUrl, setThumbnailUrl] = useState(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [content, setContent] = useState("")
  const [categories, setCategories] = useState([])

  const id = match.params.id

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail])

  useEffect(() => {
    loadCategories()
    loadPost()
    // eslint-disable-next-line
  }, [])

  function loadPost() {
    api.get(`/admin/posts/${id}`)
      .then(res => {
        const {
          thumbnail_url,
          title,
          slug,
          description,
          content,
          category
        } = res.data

        setThumbnailUrl(thumbnail_url)
        setTitle(title)
        setSlug(slug)
        setDescription(description)
        setContent(content)
        setCategory(category)

        setLoading(false)
      })
      .catch(err => console.error(err))
  }

  function loadCategories() {
    api.get('/admin/categories/all')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err))
  }

  // Função responsável por salvar dados da postagem
  // por ser multipart form ao invés de JSON, a função vai ser um pouco diferente
  function updateData() {
    const data = new FormData()

    if (+category === 0) toast.error("Selecione uma categoria")
    else {
      data.append('thumbnail', thumbnail)
      data.append('title', title)
      data.append('slug', slug)
      data.append('description', description)
      data.append('category', category)
      data.append('content', content)

      api.patch(`/admin/posts/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.EXBLOG_TOKEN}` }
      })
        .then(res => {
          toast.success(res.data.msg)
          history.push('/admin/posts')
        })
        .catch(err => console.error(err))
    }

  }

  function handleSubmit(e) {
    e.preventDefault()

    updateData()
  }

  return (
    <div className="new-post mt-5">
      <MDBBreadcrumb>
        <MDBBreadcrumbItem>
          <a href="/admin">Dashboard</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem>
          <a href="/admin/posts">Postagens</a>
        </MDBBreadcrumbItem>
        <MDBBreadcrumbItem active>Editar postagem</MDBBreadcrumbItem>
      </MDBBreadcrumb>
      <h1 className="display-3">Editar postagem</h1>

      <hr />

      {loading ? <Loading /> :
        <form className="mt-5" onSubmit={handleSubmit}>

          <center>
            <label>Thumbnail</label>
            <label
              id="thumbnail"
              style={{ backgroundImage: `url(${thumbnail ? preview : thumbnailUrl})` }}
              className={(thumbnail || thumbnailUrl) ? 'has-thumbnail edit' : 'edit'}
            >
              <input
                type="file"
                onChange={e => setThumbnail(e.target.files[0])}
              />
              {/* Para o usuário pode selecionar mais de um arquivo é utilizado a propriedade multiple */}
              <i className="fas fa-pen"></i>
            </label>
          </center>

          <MDBRow>
            <MDBCol sm="12" md="6">
              <MDBInput
                label="Título"
                group
                type="text"
                validate
                required
                onChange={e => setTitle(e.target.value)}
                value={title}
              />
            </MDBCol>
            <MDBCol sm="12" md="6">
              <MDBInput
                label="Slug"
                group
                type="text"
                validate
                required
                onChange={e => setSlug(e.target.value)}
                value={slug}
              />
            </MDBCol>
          </MDBRow>

          <MDBInput
            label="Descrição"
            group
            type="text"
            validate
            required
            onChange={e => setDescription(e.target.value)}
            value={description}
          />

          <label className="mt-4 text-muted">Categoria: </label>
          <select
            className="browser-default custom-select"
            onChange={e => setCategory(e.target.value)}
            value={category}
          >
            <option value="0">Selecione a categoria</option>
            {categories.map(category => (
              <option key={category._id} value={category._id}>{category.name}</option>
            ))}
          </select>

          <div className="mt-5">
            <label className="text-muted">Conteúdo: </label>
            <CKEditor
              editor={ClassicEditor}
              data={content}
              onChange={(e, editor) => setContent(editor.getData())}
              required
            />
          </div>

          <div className="mt-3">
            <MDBBtn
              color="danger"
              onClick={() => history.push('/admin/posts')}
            >
              Cancelar
          </MDBBtn>

            <MDBBtn
              color="success"
              type="submit"
            >
              Salvar alterações
          </MDBBtn>
          </div>
        </form>
      }
    </div>
  )
}

export default NewPost;
