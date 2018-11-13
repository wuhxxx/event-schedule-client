import React, { Component } from "react";
import "../styles/Schedule.css";
import Timeline from "./Timeline.js";

export default class Schedule extends Component {
    render() {
        return (
            <div className="cd-schedule">
                <Timeline from={9 * 60} to={18 * 60} />
            </div>
        );
    }
}
