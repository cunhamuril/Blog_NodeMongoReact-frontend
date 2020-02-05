import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

import './styles.css'

const FooterPage = () => {
  return (
    <MDBFooter className="footer font-small mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          App desenvolvido por: <a
            href="https://www.github.com/cunhamuril"
            target="_blank" rel="noopener noreferrer"
            className="dev-link"
          >
            Murilo Cunha
            </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;