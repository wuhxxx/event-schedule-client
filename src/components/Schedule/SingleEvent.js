import React from "react";
import PropTypes from "prop-types";
import toTimeString from "../../utils/toTimeString.js";
import { toHexColor } from "../../utils/colorConverters.js";
import { EVENT_SLOT_HEIGHT, TIMELINE_UNIT_DURATION } from "../../constants";

import "../../styles/SingleEvent.css";

function SingleEvent(props) {
    const { event, timelineFrom, isOnDesktop, openModal } = props;
    const { title, color, startAt, endAt } = event;

    const liStyle = { backgroundColor: toHexColor(color) };
    if (isOnDesktop) {
        // place event on a proper position of grid when render on desktop
        const duration = endAt - startAt;
        const eventTop =
            (EVENT_SLOT_HEIGHT * (startAt - timelineFrom)) /
            TIMELINE_UNIT_DURATION;
        const eventHeight =
            (EVENT_SLOT_HEIGHT * duration) / TIMELINE_UNIT_DURATION;
        // add top and height style
        liStyle.top = `${eventTop - 1}px`;
        liStyle.height = `${eventHeight + 1}px`;
    }
    return (
        <li className="single-event" style={liStyle}>
            <a href="#0" onClick={openModal}>
                <span className="event-date">
                    {`${toTimeString(startAt)} - ${toTimeString(endAt)}`}
                </span>
                <em className="event-name">{title}</em>
            </a>
        </li>
    );
}

SingleEvent.propTypes = {
    event: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    timelineFrom: PropTypes.number.isRequired,
    isOnDesktop: PropTypes.bool
};

export default SingleEvent;
