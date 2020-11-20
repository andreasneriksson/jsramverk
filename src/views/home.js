import React, { Component } from 'react';
import { baseUrl } from "../vars.js";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: null, };
    }

    componentDidMount() {
        const apiUrl = baseUrl;
        fetch(apiUrl)
            .then((response) => response.json())
            .then(data => {
                this.setState({ data });
                console.log(this.state.data);
            });
    }

    render() {
        return <div
            dangerouslySetInnerHTML={{__html: this.state.data}} >
        </div>
    }

}

export default Home;