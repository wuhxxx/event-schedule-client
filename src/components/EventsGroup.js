import React, { Component } from "react";
import PropTypes from "prop-types";
import Responsive from "react-responsive";
import "../styles/EventsGroup.css";

const Tablet = props => <Responsive {...props} minWidth={800} />;
const Mobile = props => <Responsive {...props} maxWidth={799} />;

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
                <Tablet>
                    <ul style={{ height: this.props.eventsGroupUlHeight }}>
                        {/* <li className="single-event">
                        <a href="#0">
                            <em class="event-name">Abs Circuit</em>
                        </a>
                    </li> */}
                    </ul>
                </Tablet>
                <Mobile>
                    <ul>
                        {/* <li className="single-event">
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
