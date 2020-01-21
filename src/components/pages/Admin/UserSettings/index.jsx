import React, { useState } from "react";
import {
  MDBTabPane,
  MDBTabContent,
  MDBNav,
  MDBNavItem,
  MDBNavLink,
} from "mdbreact";

import DataSettings from './DataSettings'
import ChangePassword from './ChangePassword'
import DeleteAccount from './DeleteAccount'

function UserSettings() {
  const [activeItem, setActiveItem] = useState("1");

  function toggle(tab) {
    if (activeItem !== tab) setActiveItem(tab)
  }

  return (
    <div className="user-settings mt-5">
      <h1 className="display-3">Configurações</h1>

      <hr />
      <MDBNav className="nav-tabs mt-5">
        <MDBNavItem>
          <MDBNavLink to="#" active={activeItem === "1"} onClick={() => toggle("1")} role="tab" >
            Dados
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="#" active={activeItem === "2"} onClick={() => toggle("2")} role="tab" >
            Redefinir senha
            </MDBNavLink>
        </MDBNavItem>
        <MDBNavItem>
          <MDBNavLink to="#" active={activeItem === "3"} onClick={() => toggle("3")} role="tab" >
            Excluir cadastro
            </MDBNavLink>
        </MDBNavItem>
      </MDBNav>
      <MDBTabContent activeItem={activeItem} >
        <MDBTabPane tabId="1" role="tabpanel">
          <DataSettings />
        </MDBTabPane>
        <MDBTabPane tabId="2" role="tabpanel">
          <ChangePassword />
        </MDBTabPane>
        <MDBTabPane tabId="3" role="tabpanel">
          <DeleteAccount />
        </MDBTabPane>
      </MDBTabContent>
    </div>
  );
}

export default UserSettings;