import React, { Component } from 'react';
import Nav from './components/Nav';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayed_form: '',
      logged_in: !!localStorage.getItem('token'),
      username: '',
      error: ''
    };
  }
  
  parseJWT(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

  componentDidMount() {
    if (this.state.logged_in) {
      fetch('http://localhost:8000/main/current_user/', {
        headers: {
          Authorization: `JWT ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(json => {
          this.setState({ username: json.username });
        });
      let tokenData = this.parseJWT(localStorage.getItem('token'))
      let nowUnix = Date.parse(new Date()) / 1000
      if (tokenData.exp < nowUnix) {
        this.setState({logged_in: false, displayed_form: 'login'})
        localStorage.removeItem('token')
      }
    }
  }

  handle_login = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          this.setState({error: true})
        }
        return res.json()
      })
      .then(json => {
         // eslint-disable-next-line
        if (json.user != undefined) {
          localStorage.setItem('token', json.token);
          this.setState({
            logged_in: true,
            displayed_form: '',
            error: false,
            username: json.user.username
          });
        }
      })
  };

  handle_signup = (e, data) => {
    e.preventDefault();
    fetch('http://localhost:8000/main/users/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        this.setState({
          logged_in: true,
          displayed_form: '',
          username: json.username
        });
      });
  };

  handle_logout = () => {
    localStorage.removeItem('token');
    this.setState({ logged_in: false, username: '' });
  };

  display_form = form => {
    this.setState({
      displayed_form: form
    });
  };

  render() {
    let form;
    switch (this.state.displayed_form) {
      case 'login':
        form = <LoginForm handle_login={this.handle_login} error={this.state.error}/>;
        break;
      case 'signup':
        form = <SignupForm handle_signup={this.handle_signup} />;
        break;
      default:
        form = null;
    }

    return (
      <div className="App">
        <div className="container">
          <Nav
            logged_in={this.state.logged_in}
            display_form={this.display_form}
            handle_logout={this.handle_logout}
          />
          {form}
          <div className="alert alert-success mt-4" role="alert">
            {this.state.logged_in
              ? `Привет, ${this.state.username}`
              : 'Пожалуйста, авторизуйтесь'}
          </div>
        </div>
      </div>
    );
  }
}

export default App;