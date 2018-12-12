import React, { Component } from "react";
import PropTypes from "prop-types";
import toTimeString from "../../utils/toTimeString.js";
import { TIME_UNIT, DEFAULT_TO, DEFAULT_FROM } from "../../constants";
import "../../styles/Timeline.css";

// Timeline of Schedule
export default class Timeline extends Component {
    // prop types
    static propTypes = {
        from: PropTypes.number,
        to: PropTypes.number
    };

    // default props
    static defaultProps = {
        from: DEFAULT_FROM,
        to: DEFAULT_TO
    };

    constructor(props) {
        super(props);

        // state of timeline
        this.state = {
            // from: this.props.from,
            // to: this.props.to
        };
    }

    // return a <ul> which has a bunch of <li> according to timelins's start and end
    getTimeline = () => {
        const timeList = [];
        for (
            let time = this.props.from;
            time <= this.props.to;
            time += TIME_UNIT
        ) {
            timeList.push(
                <li key={time}>
                    <span>{toTimeString(time)}</span>
                </li>
            );
        }

        return <ul>{timeList}</ul>;
    };

    render() {
        return <div className="timeline">{this.getTimeline()}</div>;
    }
}
