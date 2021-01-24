
import React from 'react';
import PropTypes from 'prop-types';

class SignupForm extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handle_change = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(prevstate => {
      const newState = { ...prevstate };
      newState[name] = value;
      return newState;
    });
  };

  render() {
    return (
      <form onSubmit={e => this.props.handle_signup(e, this.state)}>
        <h4>Регистрация</h4>
        <label htmlFor="username">Логин</label>
        <input
          type="text"
          name="username"
          className="form-control w-25"
          value={this.state.username}
          onChange={this.handle_change}
        />
        <label htmlFor="password">Пароль</label>
        <input
          type="password"
          name="password"
          className="form-control w-25"
          value={this.state.password}
          onChange={this.handle_change}
        />
        <input
            type="submit"
            className="btn btn-primary"/>
      </form>
    );
  }
}

export default SignupForm;

SignupForm.propTypes = {
  handle_signup: PropTypes.func.isRequired
};