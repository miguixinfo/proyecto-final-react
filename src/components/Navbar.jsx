import React from 'react';
import { NavLink } from 'react-router-dom';
import ImgHeader from '../assets/descarga.png';
import '../index.css';

function Navbar() {
  return (
    <nav className="navbar bg-rojomarvel">
      <div className="container-fluid">
        <img src={ImgHeader} alt="" width="150" height="70" />
        <ul className="ul-nav ">
          <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/">Home</NavLink></li>
          <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/comics">Comics</NavLink></li>
          <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/peliculas">Películas</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
