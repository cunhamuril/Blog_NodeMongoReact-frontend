import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from './components/pages/Home'
import HomeAdmin from './components/pages/Admin'
import CategoriesAdmin from './components/pages/Admin/Categories'

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />

        {/* Admin pages */}
        <Route exact path="/admin" component={HomeAdmin} />
        <Route exact path="/admin/categories" component={CategoriesAdmin} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes