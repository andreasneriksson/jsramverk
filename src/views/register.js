import React from 'react';
import { baseUrl } from "../vars.js";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.routeRedirect = this.routeRedirect.bind(this);

    this.state = {
        email: "",
        password: ""
    };
  }

  handleSubmit = (e) => {
      e.preventDefault();
      const apiUrl = `${baseUrl}register/`;

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
          console.log("user: ", user);
          console.log(data);
      });
      this.routeRedirect();
  };


  handleChange = e => {
      let name = e.target.name;
      let value = e.target.value;
      this.setState({
      [name]: value
    })
  }

  routeRedirect() {
      alert("Användare skapad");
      let path = "/login";
      this.props.history.push(path);
  }

  render() {
    return (
        <section class="main">
            <h1>Registrera användare</h1>
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
                    <input class="button green-button full-width-button" type="submit" value="Registrera" /></p>
                    </form>
                </div>
            </div>
      </section>
    );
  }
}
export default Register;