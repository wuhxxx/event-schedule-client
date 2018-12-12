import React, { Component } from "react";
import EventsGroup from "./EventsGroup.js";
import PropTypes from "prop-types";
import { WEEK_DAYS } from "../../constants";

import "../../styles/EventsWrapper.css";

export default class EventsWrapper extends Component {
    // prop types
    static propTypes = {
        eventsGroupUlHeight: PropTypes.number
    };

    constructor(props) {
        super(props);
    }

    generateEventsGroups = () => {
        const eventsGroupArr = [];

        for (let i = 0; i < WEEK_DAYS.length; i++) {
            eventsGroupArr.push(
                <EventsGroup
                    weekday={WEEK_DAYS[i]}
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
