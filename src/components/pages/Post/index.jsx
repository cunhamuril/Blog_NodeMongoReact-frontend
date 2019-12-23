import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdbreact";

import './styles.css'

import api from '../../../services/api'

import Loading from '../../template/Loading'

const Post = ({ match }) => {
  const [apiData, setApiData] = useState({})
  const [category, setCategory] = useState({})
  const [loading, setLoading] = useState(true)

  const slug = match.params.slug

  useEffect(() => {
    api.get(`/posts/${slug}`)
      .then(res => {
        setLoading(false)
        setApiData(res.data)
        setCategory(res.data.category)
      })
      .catch(err => console.error(err))
  }, [slug])

  const { date, title, description, content, thumbnail_url } = apiData

  return (
    loading ? <Loading /> :
      <div className="post mt-5">
        <MDBBreadcrumb>
          <MDBBreadcrumbItem>
            <a href="/">Home</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem>
            <a href={`/categories/${category.slug}`}>{category.name}</a>
          </MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>{title} &nbsp;</MDBBreadcrumbItem>
        </MDBBreadcrumb>

        <h1 className="display-4">{title}</h1>
        <hr />

        <div className="d-flex justify-content-between">
          <small className="text-muted">Data de publicação: {date}</small>
          <small className="text-muted">{category.name}</small>
        </div>

        <div className="d-flex align-items-center justify-content-center my-5">
          <img width="100%" src={thumbnail_url} alt="Thumbnail" className="thumbnail" />
        </div>

        <h3>{description}</h3>

        <div className="content my-5">
          {ReactHtmlParser(content)}
        </div>

      </div>
  )
};

export default Post;
