import React from 'react';
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

function App() {
  return (
    <div className="App">
      <ToastContainer draggable={true} position={"top-right"} autoClose={2500} />
      <Header />
      <MDBContainer className="main">
        <Routes />
      </MDBContainer>
      <Footer />
    </div>
  );
}

export default App;
