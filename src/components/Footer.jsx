import React from 'react';
import imgLogo from '../assets/marvel-logo-minimalista.png';

function Footer() {
  return (

    <div className="text-center text-lg-start footer--bg__negro footer--border text-light">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="container text-center ">
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bgfacebook mx-3" href="#!">
            <i className="fab fa-facebook " />
          </a>
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bgtwitter mx-3" href="#!">
            <i className="fab fa-twitter" />
          </a>
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bggoogle mx-3" href="#!">
            <i className="fab fa-google" />
          </a>
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bginstagram mx-3" href="#!">
            <i className="fab fa-instagram" />
          </a>
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bglinkedin mx-3" href="#!">
            <i className="fab fa-linkedin-in" />
          </a>
          <a className="btn text-white btn-floating btn-circle btn-foot footer--bggithub mx-3" href="#!">
            <i className="fab fa-github" />
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 ml-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <img src={imgLogo} alt="" width="150" height="70" />
              </h6>

            </div>
            <div className="col-md-3 col-lg-2 col-xl-2 mr-5 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Paginas legales
              </h6>
              <p>
                <a href="paginaslegales.html" className="text-reset text-decoration-none">Aviso legal</a>
              </p>
              <p>
                <a href="paginaslegales.html" className="text-reset text-decoration-none">Política de privacidad</a>
              </p>
              <p>
                <a href="paginaslegales.html" className="text-reset text-decoration-none">Política de cookies</a>
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mr-5 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Productos
              </h6>
              <p>
                <a href="https://angular.io/" className="text-reset text-decoration-none">Series</a>
              </p>
              <p>
                <a href="https://es.reactjs.org/" className="text-reset text-decoration-none">Juguetes</a>
              </p>
              <p>
                <a href="https://vuejs.org/" className="text-reset text-decoration-none">Videojuegos</a>
              </p>
              <p>
                <a href="https://laravel.com/" className="text-reset text-decoration-none">Películas</a>
              </p>
            </div>
            <div className="col-md-4 col-lg-3 col-xl-3 mb-md-0 mb-4 mr-5">
              <h6 className="text-uppercase fw-bold mb-4">Contacto</h6>
              <p>
                <i className="fas fa-home me-3 text-secondary" />
                {' '}
                toeldo
              </p>
              <p>
                <i className="fas fa-envelope me-3 text-secondary" />
                info@example.com
              </p>
              <p>
                <i className="fas fa-phone me-3 text-secondary" />
                {' '}
                +34 925 234 837
              </p>
              <p>
                <i className="fas fa-print me-3 text-secondary" />
                {' '}
                +34 925 234 837
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-center p-4">
        <p>
          © 2022 Copyright:
          <a className="text-reset fw-bold text-decoration-none" href="https://www.marvel.com/"> marvel.com</a>
        </p>
      </div>
    </div>
  );
}

export default Footer;
