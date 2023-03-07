import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="div">
      <div className="text-center" id="bg-image">
        <div className="mask" id="mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">MARVEL</h1>
              <ul className="list-unstyled">
                <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/comics">Comics</NavLink></li>
                <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/series">Series</NavLink></li>
                <li className="li-nav"><NavLink className="li-nav-navlink btn border third mx-2" to="/characters">Personajes</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
