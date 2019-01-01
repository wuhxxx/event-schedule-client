import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Timeline from "./Timeline.js";
import EventsGroup from "./EventsGroup.js";
import EventModal from "./EventModal.js";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import CircularProgress from "@material-ui/core/CircularProgress";
import { clearError } from "../../actions/eventActions.js";
import {
    TIMELINE_UNIT_DURATION,
    EVENT_SLOT_HEIGHT,
    DEFAULT_TO,
    DEFAULT_FROM,
    WEEK_DAYS
} from "../../constants";

import "../../styles/Schedule.css";

class Schedule extends Component {
    static propTypes = {
        isUserLoggedIn: PropTypes.bool,
        isLoadingUserEvents: PropTypes.bool,
        events: PropTypes.array,
        error: PropTypes.object,
        clearError: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            eventToShowInModal: null,
            ...this.organizeEventsByWeekday(props.events)
        };
    }

    componentDidMount() {
        console.log("Schedule initial props: ", this.props);
        // setTimeout(() => {
        //     this.setState({ isLoadingEvents: true });
        // }, 3000);
        // setTimeout(() => {
        //     this.setState({ isLoadingEvents: false });
        // }, 6000);
    }

    componentDidUpdate(prevProps) {
        // console.log("Schedule update props from: ", prevProps);
        // console.log("Schedule update props to: ", this.props);
        if (this.props.error) {
            // consume error
            this.props.clearError();
        } else if (prevProps.events !== this.props.events) {
            // if events array changed, reorganize
            this.setState(this.organizeEventsByWeekday(this.props.events));
        }
        console.log("did update");
    }

    // return a click handler which bind a specific event for <SingleEvent />
    openModalWithEvent = event => e => {
        e.preventDefault();
        this.setState({ isModalOpen: true, eventToShowInModal: event });
    };

    closeModal = event => {
        if (event) event.preventDefault();
        this.setState({ isModalOpen: false });
    };

    // Iterate through given events array and organize it to a 2-D array by weekday.
    // also compute the timeline's from and to
    organizeEventsByWeekday = events => {
        let timelineFrom = DEFAULT_FROM,
            timelineTo = DEFAULT_TO;
        const eventsByWeekday = [];
        for (let i = 0; i < WEEK_DAYS.length; i++) {
            eventsByWeekday[i] = [];
        }
        if (Array.isArray(events)) {
            // sort events by event's startAt
            events.sort((e1, e2) => e1.startAt - e2.startAt);
            // loop through events
            for (let i = 0; i < events.length; i++) {
                let event = events[i];
                let { weekday, startAt, endAt } = event;
                // update timeline from
                if (startAt < timelineFrom)
                    timelineFrom =
                        startAt <= 0
                            ? 0
                            : Math.floor(startAt / TIMELINE_UNIT_DURATION) *
                              TIMELINE_UNIT_DURATION;
                // update timeline to
                if (endAt > timelineTo)
                    timelineTo =
                        endAt >= 1440
                            ? 1440
                            : Math.ceil(endAt / TIMELINE_UNIT_DURATION) *
                              TIMELINE_UNIT_DURATION;
                // push event to corresponding weekday events array
                eventsByWeekday[weekday].push(event);
            }
        }

        const eventsGroupUlHeight = this.computeEventsGroupUlHeight(
            timelineFrom,
            timelineTo
        );
        return {
            eventsByWeekday,
            timelineFrom,
            timelineTo,
            eventsGroupUlHeight
        };
    };

    // compute Timeline's ul tag css height and return the corresponding css height for EventsGroup's events ul tag css height
    computeEventsGroupUlHeight = (timelineFrom, timelineTo) => {
        return (
            Math.ceil((timelineTo - timelineFrom) / TIMELINE_UNIT_DURATION) *
            EVENT_SLOT_HEIGHT
        );
    };

    render() {
        const {
            eventsByWeekday,
            timelineFrom,
            timelineTo,
            eventsGroupUlHeight
        } = this.state;

        return (
            <div className="cd-schedule">
                {// spinner conditional rendering
                this.props.isLoadingUserEvents && (
                    <div className="progress-container">
                        <CircularProgress color="secondary" />
                        <div>Loading events...</div>
                    </div>
                )}
                <Timeline from={timelineFrom} to={timelineTo} />
                {/* <EventsWrapper
                    eventsGroupUlHeight={this.getEventsGroupUlHeight()}
                /> */}
                <div className="events">
                    <ul>
                        {WEEK_DAYS.map((WEEK_DAY, i) => (
                            <EventsGroup
                                key={i}
                                weekday={WEEK_DAY}
                                events={eventsByWeekday[i]}
                                timelineFrom={timelineFrom}
                                ulCSSHeight={eventsGroupUlHeight}
                                openModalWithEvent={this.openModalWithEvent}
                            />
                        ))}
                    </ul>
                </div>
                {/* Add event button from material ui */}
                <Tooltip
                    title="Add Event"
                    placement="top"
                    aria-label="Add Event"
                >
                    <Fab
                        color="secondary"
                        aria-label="Add"
                        style={{
                            position: "fixed",
                            right: "40px",
                            bottom: "35px",
                            zIndex: 2,
                            width: "70px",
                            height: "70px"
                        }}
                    >
                        <AddIcon style={{ width: "30px", height: "30px" }} />
                    </Fab>
                </Tooltip>
                <EventModal
                    closeModal={this.closeModal}
                    isModalOpen={this.state.isModalOpen}
                    eventToShow={this.state.eventToShowInModal}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.User.isUserLoggedIn,
        isLoadingUserEvents: state.Event.isLoadingUserEvents,
        events: state.Event.events,
        error: state.Event.error
    };
};

export default connect(
    mapStateToProps,
    { clearError }
)(Schedule);
