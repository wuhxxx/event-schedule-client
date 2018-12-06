import React, { Component } from "react";
import { TIME_UNIT, DEFAULT_TO, DEFAULT_FROM } from "../../constants.js";
import Timeline from "./Timeline.js";
import EventsWrapper from "./EventsWrapper.js";

import "../../styles/Schedule.css";

export default class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timelineFrom: this.trimFrom(540),
            timelineTo: this.trimTo(18 * 60)
        };
    }

    componentDidMount() {
        // setTimeout(() => {
        //     this.setState({ timelineFrom: 9 * 60, timelineTo: 18 * 60 });
        // }, 5000);
    }

    // trim and return timeline's start time
    trimFrom = from => {
        // number of minutes, range [0, 1440]
        // default value is 9 * 60
        if (from >= DEFAULT_FROM) return DEFAULT_FROM;
        // must be a integer multiple of 60, "~~" is Math.floor()
        else return from <= 0 ? 0 : ~~(from / TIME_UNIT) * TIME_UNIT;
    };

    // trim and return timeline's end time
    trimTo = to => {
        // number of minutes, range [0, 1440], must be larger than state.from
        // default value is 18 * 60
        if (to <= DEFAULT_TO) return DEFAULT_TO;
        else return to >= 1440 ? 1440 : (~~(to / TIME_UNIT) + 1) * TIME_UNIT;
    };

    // compute Timeline's ul tag css height and return the corresponding css height for EventsGroup's events ul tag css height
    geteventsGroupUlHeight = () => {
        const to = this.state.timelineTo;
        const from = this.state.timelineFrom;
        return (~~((to - from) / TIME_UNIT) + 1) * 50;
    };

    render() {
        return (
            <div className="cd-schedule">
                <Timeline
                    from={this.state.timelineFrom}
                    to={this.state.timelineTo}
                />
                <EventsWrapper
                    eventsGroupUlHeight={this.geteventsGroupUlHeight()}
                />
            </div>
        );
    }
}
