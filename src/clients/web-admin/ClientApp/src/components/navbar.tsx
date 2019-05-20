import * as React from 'react';

import { Nav, NavbarBrand, Navbar as ReactNavbar, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

export class Navbar extends React.PureComponent {
  render() {
    return (
      <ReactNavbar expand light color="light">
        <NavbarBrand>MarcellToth.Net</NavbarBrand>
        <Nav>
          <NavItem>
            <NavLink tag={RRNavLink} to="/articles">Articles</NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={RRNavLink} to="/static-files">Static Files</NavLink>
          </NavItem>
        </Nav>
      </ReactNavbar>
    );
  }
}