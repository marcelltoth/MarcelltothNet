import * as React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavbarBrand, Navbar, NavItem } from 'reactstrap';

export class App extends React.Component {
  render() {
    return (
      <Navbar expand light color="light">
        <NavbarBrand>MarcellToth.Net</NavbarBrand>
        <Nav>
          <NavItem>
            Articles
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}