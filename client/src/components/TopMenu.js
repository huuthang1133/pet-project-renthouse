import React, { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LogIn";

export default function TopMenu(props) {
  const { onLogout } = useContext(LoginContext);
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <Navbar componentclass='span' color="light" light expand="md">
        <NavbarBrand href="/">Pet Project</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>
              <Link to="/">Home</Link>
            </NavLink>
          </NavItem>
          {user && user.isAdmin ? (
            <NavItem>
              <NavLink>
                {!user && <Link to="/account/">Your Account</Link>}
                {user && <Link to="/admin/">{user.username}</Link>}
              </NavLink>
            </NavItem>
          ) : (
            <NavItem>
              <NavLink>
                {!user && <Link to="/account/">Your Account</Link>}
                {user && <Link to="/account/">{user.username}</Link>}
              </NavLink>
            </NavItem>
          )}

          <NavItem>
            <NavLink>
              {!user && <Link to="/Login/">Log in</Link>}
              {user && <Link to="/" onClick={onLogout}>Log out</Link>}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
