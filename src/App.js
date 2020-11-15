import React, { Component } from "react";
import markdown from './README.md';
import ReactMarkdown from 'react-markdown';
import Home from './views/home.js';
import Reports from './views/reports.js';
import Register from './views/register.js';
import Login from './views/login.js';
import EditReport from './views/edit.js';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        <aside class="sidebar">
          <nav class="nav">
            <ul>
              <li>
                <Link to="/">Start</Link>
              </li>
              <li>
                <Link to="/reports/week/1">Rapporter</Link>
              </li>
              <li>
                <Link to="/login">Logga in</Link>
              </li>
              <li>
                <Link to="/register">Registrera</Link>
              </li>
            </ul>
          </nav>
        </aside>
        

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact strict path="/reports/week/:id" component={Reports}/>
          <Route exact strict path="/edit/:id" component={EditReport}/>
          <Route exact strict path="/login" component={Login}/>
          <Route exact strict path="/register" component={Register}/>
          <Route exact strict path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}


// class Presentation extends Component {
//   constructor() {
//     super();
//     this.state = { data: "" };
//   }

//   componentDidMount() {
//     fetch(markdown).then((response) => response.text()).then((text) => {
//       console.info(text);
//       this.setState({ data: text })
//       console.info(this.state.data);
//     })
//   }

//   render() {
//     console.info(this.state.data);
//     return (
//       <section class="main">
//         <h1>Redovisning</h1>
//         <div class="container">
//         <ReactMarkdown source={this.state.data} />
//         </div>
//       </section>
//     );
//   }
// }
