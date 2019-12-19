import React from 'react';
import './App.css';

// React Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// MDBootstrap
import 'bootstrap/dist/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'

import { MDBContainer } from "mdbreact";

import qrCode from './assets/frame.png'

// Routes
import Routes from './routes'

// Components
import Header from './components/template/Header'
import Footer from './components/template/Footer'

function App() {
  return (
    <div className="App">
      <ToastContainer draggable={true} position={"bottom-right"} autoClose={2000} />
      <Header />
      <MDBContainer className="main">
        <Routes />
      </MDBContainer>
      <div className="mt-3 qr-code d-flex align-items-center">
        <img src={qrCode} alt="QR Code" width="50px" />
      </div>
      <Footer />
    </div>
  );
}

export default App;
