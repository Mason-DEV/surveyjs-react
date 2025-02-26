import React from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";

const Header = () => {
  return (
    <Navbar color="dark" dark expand="md" className="sticky-top">
      <NavbarBrand tag={Link} to="/">
        SurveyJS POC
      </NavbarBrand>
      <Nav className="ml-auto" sticky="top" navbar>
        <NavItem>
          <NavLink tag={Link} to="/">
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/propertyeditor">
            Property Editor
          </NavLink>
        </NavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
