import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

const data = [
    { x: 1, y: 13000 },
    { x: 2, y: 26000 },
    { x: 3, y: 14000 },
    { x: 4, y: 21000 },
];

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
            <div>
            <VictoryChart domainPadding={20}>
                <VictoryAxis
                    props={{
                        tickValues: [1, 2, 3, 4],
                        tickFormat: ["Q1", "Q2", "Q3", "Q4"]
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`$${x / 1000}k`)}
                />
                <VictoryLine data={data} x="x" y="y" />
            </VictoryChart>
            {(this.state.data.data1 
                ? this.state.data.data1.map((elem) => <p>{elem}</p>)
                : <p>"Loading..."</p>
            )}
            </div>
        );
    }
}
