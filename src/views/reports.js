import React, { Component } from 'react';
import { baseUrl } from "../vars.js";

class Reports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            week: null,
            reptext: ""
        };
    }

    componentDidMount() {
        var id = this.props.match.params.id;
        var apiUrlId = `${baseUrl}reports/week/${id}`;

        fetch(apiUrlId)
            .then((response) => response.json())
            .then(data => {
                this.setState({
                    reptext: data.data.reptext,
                    week: data.data.week
            });
        });
    }

    render() {
        var currUrl = window.location.href.slice(0, -1);
        var id = this.props.match.params.id;

        return (
        <section class="main">
            <div class="container">
                <nav className="reports">
                    <a href={currUrl + "1"}>kmom01</a>
                    <a href={currUrl + "2"}>kmom02</a>
                    <a href={currUrl + "3"}>kmom03</a>
                    <a href={currUrl + "4"}>kmom04</a>
                    <a href={currUrl + "5"}>kmom05</a>
                    <a href={currUrl + "6"}>kmom06</a>
                    <a href={currUrl + "10"}>kmom10</a>
                </nav>
                <h1 dangerouslySetInnerHTML= {{__html: "Kursmoment " + this.state.week}} ></h1>
                <div
                    dangerouslySetInnerHTML={{__html: this.state.reptext}} >
                </div>
                <a class="button green-button full-width-button" href={"/edit/" + id}>Redigera rapport</a>
            </div>
        </section>
    )
    }
}

export default Reports;