import React from 'react';
import { NavLink } from 'react-router-dom';
import ImgHeader from '../assets/descarga.png';
import '../index.css';

function Navbar() {
  return (
    <nav className="navbar navbar--bg__rojomarvel">
      <div className="container-fluid">
        <img src={ImgHeader} alt="" width="150" height="70" />
        <ul className="navbar--ul">
          <li className="navbar--li"><NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/">Home</NavLink></li>
          <li className="navbar--li"><NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/comics">Comics</NavLink></li>
          <li className="navbar--li"><NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/series">Series</NavLink></li>
          <li className="navbar--li"><NavLink className="navbar--navlink btn border navbar--btn mx-2 my-2" to="/characters">Personajes</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
