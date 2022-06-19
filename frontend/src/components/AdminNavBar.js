import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";


import flore from "../assets/floredumaroclogo.png";
import { Drawer, ActionIcon } from "@mantine/core";
import { Menu2 } from "tabler-icons-react";

import "../styles/AdminNavBar.scss";

const AdminNavBar = () => {
  const [opened, setOpened] = useState(false);
  const location = useLocation()
  useEffect(() => {
      setOpened(false)
  }, [location.pathname])
  return (
    <header className="nav-logo-container">
         <Link to={'/'}>
      <img className="title-img" src={flore} alt="" />
      </Link>

      <nav className="admin-navbar desctivate-nav-bar">
        <ul>
          <li>
            <NavLink className="embranchement" to="/admin/phylum">
              Embranchements
            </NavLink>
          </li>
          <li>
            <NavLink className="famille" to="/admin/family">
              Familles
            </NavLink>
          </li>
          <li>
            <NavLink className="genre" to="/admin/genus">
              Genres
            </NavLink>
          </li>
          <li>
            <NavLink className="espece" to="/admin/species">
              Especes
            </NavLink>
          </li>
        </ul>
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
        <div className="nav-div-burger">
          <ul>
            <li>
              <NavLink className="embranchement" to="/admin/phylum">
                Embranchements
              </NavLink>
            </li>
            <li>
              <NavLink className="famille" to="/admin/family">
                Familles
              </NavLink>
            </li>
            <li>
              <NavLink className="genre" to="/admin/genus">
                Genres
              </NavLink>
            </li>
            <li>
              <Link className="espece" to="/admin/species">
                Especes
              </Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </header>
  );
};

export default AdminNavBar;
