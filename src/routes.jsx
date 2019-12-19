import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/pages/Home'
import HomeAdmin from './components/pages/Admin'
import CategoriesAdmin from './components/pages/Admin/Categories'
import PostsAdmin from './components/pages/Admin/Posts'
import NewPost from './components/pages/Admin/Posts/NewPost'
import EditPost from './components/pages/Admin/Posts/EditPost'


function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        {/* Admin pages */}
        <Route exact path="/admin" component={HomeAdmin} />
        <Route exact path="/admin/categories" component={CategoriesAdmin} />

        <Route exact path="/admin/posts" component={PostsAdmin} />
        <Route exact path="/admin/posts/new" component={NewPost} />
        <Route exact path="/admin/posts/edit/:id" component={EditPost} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes