import React, { Component } from "react";
import PropTypes from "prop-types";
import Responsive from "react-responsive";
import SingleEvent from "./SingleEvent";

import "../../styles/EventsGroup.css";

const Desktop = props => <Responsive {...props} minWidth={800} />;
const Mobile = props => <Responsive {...props} maxWidth={799} />;

export default class EventsGroup extends Component {
    // prop types
    static propTypes = {
        events: PropTypes.array.isRequired,
        weekday: PropTypes.string.isRequired,
        timelineFrom: PropTypes.number.isRequired,
        ulCSSHeight: PropTypes.number.isRequired
    };

    render() {
        const { events, weekday, timelineFrom, ulCSSHeight } = this.props;
        return (
            <li className="events-group">
                <div className="top-info">
                    <span>{weekday}</span>
                </div>
                <Desktop>
                    <ul style={{ height: ulCSSHeight }}>
                        {events.map(event => (
                            <SingleEvent
                                event={event}
                                timelineFrom={timelineFrom}
                                isOnDesktop={true}
                                key={event.eventId}
                            />
                        ))}
                    </ul>
                </Desktop>
                <Mobile>
                    <ul>
                        {/* need to place events by the order of start time
                        <li className="single-event">
                        <a href="#0">
                            <em class="event-name">Abs Circuit</em>
                        </a>
                    </li> */}
                    </ul>
                </Mobile>
            </li>
        );
    }
}
