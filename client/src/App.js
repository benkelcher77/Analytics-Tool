import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

export default class App extends Component {
    constructor(props) {
        super();
        this.state = {
            data: {}
        };
    }

    fetchData() {
        // Fetch data from localhost:5000/api and put into state.
        fetch("http://localhost:5000/api")
            .then((res) => res.json())
            .then((res) => { 
                this.setState({ data: res });
            });
    }

    componentDidMount() {
        // Every 1000ms, fetch data from the API.
        // TODO Maybe make this controllable via a settings menu on the dashboard?
        this.fetchInterval = setInterval(() => {
            this.fetchData();
        }, 1000);
    }

    componentWillUnmount() {
        // On unmount, clear the interval.
        clearInterval(this.fetchInterval);
    }

    render() {
        return (
            <VictoryChart domainPadding={20}>
                <VictoryAxis />
                <VictoryAxis dependentAxis />
                <VictoryLine data={this.state.data.data1} x="x" y="y" />
            </VictoryChart>
        );
    }
}
