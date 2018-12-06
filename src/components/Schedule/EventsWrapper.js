import React, { Component } from "react";
import EventsGroup from "./EventsGroup.js";
import PropTypes from "prop-types";
import "../../styles/EventsWrapper.css";

export default class EventsWrapper extends Component {
    // prop types
    static propTypes = {
        eventsGroupUlHeight: PropTypes.number
    };

    constructor(props) {
        super(props);
        this.weekday = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    }

    generateEventsGroups = () => {
        const eventsGroupArr = [];

        for (let i = 0; i < this.weekday.length; i++) {
            eventsGroupArr.push(
                <EventsGroup
                    weekday={this.weekday[i]}
                    eventsGroupUlHeight={this.props.eventsGroupUlHeight}
                    key={i}
                />
            );
        }

        return <ul>{eventsGroupArr}</ul>;
    };

    render() {
        return <div className="events">{this.generateEventsGroups()}</div>;
    }
}
