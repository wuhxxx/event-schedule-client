import React, { Component } from "react";
import PropTypes from "prop-types";
import "../styles/EventsGroup.css";

export default class EventsGroup extends Component {
    // prop types
    static propTypes = {
        weekday: PropTypes.string,
        eventsGroupUlHeight: PropTypes.number
    };

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <li className="events-group">
                <div className="top-info">
                    <span>{this.props.weekday}</span>
                </div>
                <ul style={{ height: this.props.eventsGroupUlHeight }}>
                    {/* <li className="single-event">
                        <a href="#0">
                            <em class="event-name">Abs Circuit</em>
                        </a>
                    </li> */}
                </ul>
            </li>
        );
    }
}
