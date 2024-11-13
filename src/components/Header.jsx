import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom"; // Correct import
import { useUser } from "../context/UserContext";
import { deleteCookie } from "../utils/common";
import { useEffect, useState } from "react";
import { getMenu } from "../utils/menu";

function Header() {
  const { userInfo, setUserInfo } = useUser();
  const navigate = useNavigate();
  const [menu, setmenu] = useState([]);
  //function to fetch userdata and set state
  useEffect(() => {
    if (userInfo)
      setmenu(getMenu(userInfo.role)); //update menu when user info changes
    else setmenu([]);
  }, [userInfo]);

  const logout = () => {
    deleteCookie("_USER_AUTH_");
    setUserInfo(null); // update userinfo state
    navigate("/");
    setmenu([]);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">RBAC</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <h5>Logged in as : {userInfo?.role}</h5>
          <Nav className="ms-auto">
          
            {menu.map((item,index) => {
              return (
                <NavLink key={index} className="ms-2 nav-link" to={item.path}>
                  {item.displayName}
                </NavLink>
              );
            })}
{/* 
            <NavLink className="ms-2 nav-link" to="admin">
              Admin Panel
            </NavLink>
            <NavLink className="ms-2 nav-link" to="user-info">
              User Info
            </NavLink>
            <NavLink className="ms-2 nav-link" to="users">
              Users
            </NavLink> */}

            {userInfo ? (
              <Button variant="danger" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button variant="variant" className="text-white">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
