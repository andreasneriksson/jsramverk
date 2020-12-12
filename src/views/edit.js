import React, { Component } from 'react';
import { baseUrl } from "../vars.js";

class EditReport extends React.Component {
    constructor(props) {
        super(props);
        this.routeRedirect = this.routeRedirect.bind(this);

        this.state = {
            week: null,
            reptext: ""
        };
    }

    componentDidMount() {
        var apiUrlId = `${baseUrl}editreport/${this.props.match.params.id}`;

        fetch(apiUrlId)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    reptext: data.data.reptext,
                    week: data.data.week
            });
        });
    }

    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
        [name]: value
      })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var id = this.props.match.params.id;
        const apiUrl = `${baseUrl}editreport/${this.props.match.params.id}`;

        console.log(localStorage.getItem('token'));

        const user = {
            "week": this.state.week,
            "reptext": this.state.reptext
        }

        fetch(apiUrl, {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
                'x-access-token': localStorage.getItem('token')
            },
            body: JSON.stringify(user)
        })
        .then((response) => response.json())
        .then(data => {
            if (data.errors) {
                alert("Du är inte inloggad");
                this.props.history.push("/login")
            } else {
                alert("Sparat o klart!");
            };
        });
        this.routeRedirect();
    };

    routeRedirect() {
        let path = "/reports/week/" + this.state.week;
        this.props.history.push(path);
    }

    render() {
        return (
        <section class="main">
            <div class="container">
                <h1 dangerouslySetInnerHTML= {{__html: this.state.week}} />
                <form onSubmit={this.handleSubmit}>
                    <label class="input-label">
                        <p>Kursmomentstext</p>
                        <textarea value={this.state.reptext} onChange={this.handleChange} name="reptext" required/>
                    </label>
                    <p>
                        <input class="button green-button full-width-button" type="submit" value="Redigera" />
                    </p>
                </form>
            </div>
        </section>
    )}
}

export default EditReport;