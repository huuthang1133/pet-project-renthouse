import React, { useContext } from "react";
import axios from 'axios'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import {GlobalState} from '../../GlobalState'
import './TopMenu.css'

export default function TopMenu() {
  const state = useContext(GlobalState)
  const [isAdmin] = state.userAPI.isAdmin
  const [isLogged] = state.userAPI.isLogged
  const [callback, setCallback] = state.callback

  const onLogout = async () => {
    localStorage.clear()
    await axios.get(`/users/logout`)
    window.location.href = '/'
  }

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Pet Project</NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink>
              <Link to="/" className="menu">THANG</Link>
            </NavLink>
          </NavItem>
          { isAdmin ? 
            <NavItem>
              <NavLink>
                <Link to="/account" className="menu">GIAO DỊCH</Link>
              </NavLink>
            </NavItem>
            : ""    
          }
          { isLogged ? 
            <NavItem>
              <NavLink>
                <Link to="/account" className="menu">PHÒNG ĐANG THUÊ</Link>
              </NavLink>
            </NavItem>
            : ""    
          }          
          <NavItem>
            <NavLink>
              <Link to="/login" className="menu">ĐĂNG NHẬP & ĐĂNG KÝ</Link>
            </NavLink>
          </NavItem>
          {isLogged || isAdmin ?             
            <NavItem>
                <NavLink>
                  <Link to="/" className="menu" onClick={onLogout}>ĐĂNG XUẤT</Link>
                </NavLink>
            </NavItem> 
          : ""
          }      
        </Nav>
      </Navbar>
    </div>
  );
}
