import React from 'react';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div className="div">
      <div className="text-center" id="inicio--imgfondo">
        <div className="mask" id="inicio--imgfondo__mask">
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3">MARVEL</h1>
              <ul className="list-unstyled">
                <li className="navbar--li"><NavLink className="navbar--navlink btn border third mx-2" to="/comics">Comics</NavLink></li>
                <li className="navbar--li"><NavLink className="navbar--navlink btn border third mx-2" to="/series">Series</NavLink></li>
                <li className="navbar--li"><NavLink className="navbar--navlink btn border third mx-2" to="/characters">Personajes</NavLink></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
