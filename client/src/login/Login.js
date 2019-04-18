import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    // sam is already registered in the solution
    username: 'rosa2', // ask students to register a user they can use to login
    password: 'perez', // to avoid having to type it when testing
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
            />
          </div>

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    // explain how this works if needed
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // the endpoint could come from an environment variable
    // const endpoint = `${process.env.API_URL}/api/auth/login`;
    const endpoint = 'http://localhost:5000/api/auth/login';

    // same as copying token & pasting it in the headers
    axios
      .post(endpoint, this.state)
      .then(res => {
        // this is the new part, explain how localStorage works
        localStorage.setItem('jwt', res.data.token); // the server returns the token
        console.log(res.data)
        // add this after the Users component is wired
        this.props.history.push('/users');
      })
      .catch(error => console.error(error));
    // the client could show a nice toast with the error
  };
}

export default Login;