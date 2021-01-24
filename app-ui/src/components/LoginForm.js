import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginForm extends React.Component {
  state = {
    username: '',
    password: '',
    error: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(this.props)
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_login(e, this.state)}>
        <h4>Вход</h4>
          <div className={this.props.error ? "alert alert-danger" : "d-none"}  role="alert">
            Неправильный логин или пароль!
          </div>
        <label htmlFor="username">Логин</label>
        <input
          className="form-control w-25"
          type="text"
          name="username"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          className="form-control w-25"
          name="password"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input type="submit" className="btn btn-primary"/>
      </form>
    );
  }
}

export default LoginForm;

LoginForm.propTypes = {
  handle_login: PropTypes.func.isRequired
};