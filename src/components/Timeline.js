import React, { Component } from "react";
import PropTypes from "prop-types";
import toTimeString from "../tools/toTimeString.js";
import { TIME_UNIT, DEFAULT_TO, DEFAULT_FROM } from "../constants.js";
import "../styles/Timeline.css";

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
            from: this.trimFrom(),
            to: this.trimTo()
        };
    }

    // trim and return timeline's start time
    trimFrom = () => {
        // number of minutes, range [0, 1440]
        // default value is 9 * 60
        if (this.props.from >= DEFAULT_FROM) return DEFAULT_FROM;
        // must be a integer multiple of 60, "~~" is Math.floor()
        else
            return this.props.from <= 0
                ? 0
                : ~~(this.props.from / TIME_UNIT) * TIME_UNIT;
    };

    // trim and return timeline's end time
    trimTo = () => {
        // number of minutes, range [0, 1440], must be larger than state.from
        // default value is 18 * 60
        if (this.props.to <= DEFAULT_TO) return DEFAULT_TO;
        else
            return this.props.to >= 1440
                ? 1440
                : (~~(this.props.to / TIME_UNIT) + 1) * TIME_UNIT;
    };

    // return a <ul> which has a bunch of <li> according to timelins's start and end
    getTimeline = () => {
        const timeList = [];
        for (
            let time = this.state.from;
            time <= this.state.to;
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
        return <div class="timeline">{this.getTimeline()}</div>;
    }
}
