import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'

function Nav(props) {
  const logged_out_nav = (
      <nav className="navbar navbar-expand-lg navbar-black bg-black">
          <div className="container-fluid">
              {/* eslint-disable-next-line*/}
              <a className="navbar-brand" href="#">JWT</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse ml-auto" id="navbarNavAltMarkup">
                  <div className="navbar-nav mt-2">
                      <p className="nav-link" onClick={() => props.display_form('login')}>Войти</p>
                      <p className="nav-link" onClick={() => props.display_form('signup')}>Зарегистрироваться</p>
                  </div>
              </div>
          </div>
      </nav>
  );

  const logged_in_nav = (
      
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
              {/* eslint-disable-next-line*/}
              <a className="navbar-brand" href="#">Navbar</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                      aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                      <ul>
                          <li className="nav-link" onClick={props.handle_logout}>Выйти</li>
                      </ul>
                  </div>
              </div>
          </div>
      </nav>
  );
  return <div>{props.logged_in ? logged_in_nav : logged_out_nav}</div>;
}

export default Nav;

Nav.propTypes = {
  logged_in: PropTypes.bool.isRequired,
  display_form: PropTypes.func.isRequired,
  handle_logout: PropTypes.func.isRequired
};