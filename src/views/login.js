import React from 'react';
import { baseUrl } from "../vars.js";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        email: "",
        password: ""
    };
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const apiUrl = `${baseUrl}login/`;
      //const proxyUrl = 'http://localhost:1337/'

      const user = {
          "email": this.state.email,
          "password": this.state.password
      }

      fetch(apiUrl, {
          method: "POST",
          headers: {
              'Content-type': 'application/json'
          },
          body: JSON.stringify(user)
      })
      .then((response) => response.json())
      .then(data => {
          if (data.data) {
              localStorage.setItem('token', data.data.token);
              console.log(data.data.token);
              console.log(localStorage.getItem('token'));
              alert("Inloggad!");
              this.props.history.push("/reports/week/1");

          } else {
              alert("Fel användare eller lösenord, försök igen.");
          }
      });
  };


  handleChange = e => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
      [name]: value
    })
  }



  render() {
    return (
        <section class="main">
            <h1>Logga in</h1>
            <div class="container">
                <div style={{verticalAlign: "top"}}>
                    <form onSubmit={this.handleSubmit}>
                    <label class="input-label">
                        <p>E-post:</p>
                        <input class="input" type="text" name="email" onChange={this.handleChange} required />
                    </label>
                    <label class="input-label">
                        <p>Lösenord:</p>
                        <input class="input" type="password" name="password" onChange={this.handleChange} required />
                    </label><p>
                    <input class="button green-button full-width-button" type="submit" value="Login" /></p>
                    </form>
                </div>
            </div>
      </section>
    );
  }
}
export default Login;