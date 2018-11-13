import React, { Component } from "react";
import TopBar from "./TopBar.js";
import Schedule from "./Schedule.js";
import "../styles/App.css";

class App extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <Schedule />
            </div>
        );
    }
}

export default App;
