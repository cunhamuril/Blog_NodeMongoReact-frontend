import React, { useEffect } from 'react';
import './App.css';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MDBootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { MDBContainer } from "mdbreact";

// Routes
import Routes from './routes'

// Components
import Header from './components/template/Header'
import Footer from './components/template/Footer'

import { isAuthenticated } from './services/auth'

function App() {
  useEffect(() => {
    isAuthenticated()
  }, [])

  return (
    <div className="App">
      <ToastContainer draggable={true} position={"bottom-right"} autoClose={2000} />
      <Header />
      <MDBContainer className="main">
        <Routes />
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default App;
