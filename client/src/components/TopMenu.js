import React, { useContext } from "react";
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LogIn";
import { RegisterContext } from "../contexts/Register";

export default function TopMenu(props) {
  const { onLogout, user } = useContext(LoginContext);
  const { jwt } = useContext(RegisterContext)
  return (
    <div>
      <Navbar color="light" light expand="md">
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
              {(!user && !jwt) && <Link to="/login/">Log in</Link>}
              {(user || jwt) && <Link to="/" onClick={onLogout}>Log out</Link>}
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
}
