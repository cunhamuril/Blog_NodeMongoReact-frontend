import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from './components/pages/Home'
import Post from './components/pages/Post';
import SearchPost from './components/pages/SearchPost';
import PostsByCategories from './components/pages/PostsByCategories';
import Signin from './components/pages/Auth/Signin'
import Signup from './components/pages/Auth/Signup'

import HomeAdmin from './components/pages/Admin'
import CategoriesAdmin from './components/pages/Admin/Categories'
import PostsAdmin from './components/pages/Admin/Posts'
import NewPost from './components/pages/Admin/Posts/NewPost'
import EditPost from './components/pages/Admin/Posts/EditPost'
import UserSettings from './components/pages/Admin/UserSettings'

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
          <Redirect to={{ pathname: "/signin", state: { from: props.location } }} />
        )
    }
  />
);

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />

        <Route exact path="/post/:slug" component={Post} />
        <Route exact path="/posts/search/:value" component={SearchPost} />
        <Route exact path="/categories/:slug" component={PostsByCategories} />

        {/* Admin pages */}
        <PrivateRoute exact path="/admin" component={HomeAdmin} />
        <PrivateRoute exact path="/admin/user" component={UserSettings} />
        <PrivateRoute exact path="/admin/categories" component={CategoriesAdmin} />
        <PrivateRoute exact path="/admin/posts" component={PostsAdmin} />
        <PrivateRoute exact path="/admin/posts/new" component={NewPost} />
        <PrivateRoute exact path="/admin/posts/edit/:id" component={EditPost} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes