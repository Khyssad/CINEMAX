import React from 'react';
import {  NavLink } from 'react-router-dom';
import './Header.css'; // Importez le fichier CSS

const Header: React.FC = () => {
  return (
    <header className="p-4 text-white bg-blue-600">
      <nav className="container flex items-center justify-between mx-auto">

        <ul className="nav-links">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              end
            >
              Accueil
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/favoris" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Favoris
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/ajouter-recette" 
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Ajouter Recette
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;