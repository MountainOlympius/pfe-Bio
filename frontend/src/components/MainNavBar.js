import {useState, useEffect} from "react";
import { NavLink, Link, useLocation } from "react-router-dom";

import { Drawer, Button, ActionIcon } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";

import flore from "../assets/floredumaroclogo.png";

import "../styles/MainNavBar.scss";

const MainNavBar = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setOpened(false);
  }, [location.pathname]);

  return (
    <header className="nav-logo-container">
        <Link to={'/'}>
      <img className="title-img" src={flore} alt="" />
      </Link>
      <nav className="main-navbar">
        <ul>
          <li>
            <NavLink className="Home" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="essayer" to="/essayer">
              essayer
            </NavLink>
          </li>
          <li>
            <NavLink className="apropos" to="/apropos">
              à propos
            </NavLink>
          </li>
        </ul>
        <Button variant="outline" color="green" component={Link} to={'/login'}>Admin</Button>
      </nav>
      <div className="burger">
        <ActionIcon onClick={() => setOpened(true)}>
          <Menu2 />
        </ActionIcon>
      </div>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        title="
        pages"
        padding="xl"
        size="xl"
      >
          <nav className="main-navbar-burger">
        <ul>
          <li>
            <NavLink className="Home" to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="essayer" to="/essayer">
              essayer
            </NavLink>
          </li>
          <li>
            <NavLink className="apropos" to="/apropos">
              à propos
            </NavLink>
          </li>
        </ul>
        <Button variant="outline" color="green" component={Link} to={'/login'}>Admin</Button>
      </nav>
      </Drawer>
    </header>
  );
};

export default MainNavBar;
