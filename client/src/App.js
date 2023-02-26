import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryAxis } from "victory";

class ChartOptionsDropdown extends Component {
    constructor(props) {
        super();
        this.state = {
            open: false  
        };
    }

    handleOpen() {
        this.setState({ open: !this.state.open }); 
    }

    render() {
        return (
            <div>
                <button onClick={() => this.handleOpen()}>Available Charts</button>
                {
                    this.state.open
                    ?
                    (
                        <ul>
                            { 
                                this.props.availableCharts.map((chart, i) => (
                                    <li key={i}>
                                        <input type="checkbox" name={chart} id={chart} />
                                        <label htmlFor={chart}>{chart}</label>
                                    </li>
                                )) 
                            }
                        </ul>
                    )
                    : null
                }
                
            </div>
        );
    }
}

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
        const availableCharts = Object.keys(this.state.data);

        return (
            <div>
                <ChartOptionsDropdown
                    availableCharts={availableCharts}
                />
                <VictoryChart domainPadding={20}>
                    <VictoryAxis />
                    <VictoryAxis dependentAxis />
                    <VictoryLine data={this.state.data.data1} x="x" y="y" />
                </VictoryChart>
            </div>
        );
    }
}
