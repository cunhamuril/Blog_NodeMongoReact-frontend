import React from "react";
import { MDBContainer, MDBFooter } from "mdbreact";

const FooterPage = () => {
  return (
    <MDBFooter color="green accent-4" className="font-small mt-4">
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          App desenvolvido por: <a href="https://www.github.com/cunhamuril" target="_blank" rel="noopener noreferrer">
            Murilo Cunha
            </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;