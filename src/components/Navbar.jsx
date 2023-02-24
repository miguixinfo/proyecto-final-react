import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar bg-danger">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 text-white ">MARVEL</span>
        <ul className="ul-nav">
          <li className="li-nav"><NavLink className="li-nav-navlink px-2" to="/">Home</NavLink></li>
          <li className="li-nav"><NavLink className="li-nav-navlink px-2" to="/comics">Comics</NavLink></li>
          <li className="li-nav"><NavLink className="li-nav-navlink px-2" to="/peliculas">Películas</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
