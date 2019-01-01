import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import toTimeString from "../../utils/toTimeString.js";
import { toHexColor } from "../../utils/colorConverters.js";

import "../../styles/EventModal.css";

// login modal root in index.html
const eventModalRoot = document.getElementById("event-modal-root");

// ESC key code
const ESC_KEY = 27;

// default modal header background color
const DEFAULT_EVENT = {
    eventId: "0",
    title: "",
    location: "",
    description: "",
    color: 10664370,
    startAt: 0,
    endAt: 1,
    weekday: 0
};

class EventModal extends Component {
    static propTypes = {
        isEditMode: PropTypes.bool,
        eventToShow: PropTypes.object,
        closeModal: PropTypes.func.isRequired,
        isModalOpen: PropTypes.bool.isRequired
    };

    escKeyDownHandler = event => {
        event.stopPropagation();
        if (this.props.isModalOpen && event.keyCode === ESC_KEY) {
            this.props.closeModal();
        }
    };

    componentDidMount() {
        // add event listener for esc key down
        document.addEventListener("keydown", this.escKeyDownHandler);
    }

    componentDidUpdate(prevProps) {
        const { isModalOpen, eventToShow } = this.props;
        // add class to selected event when modal opening
        // this makes selected event block hidden on desktop
        if (!prevProps.isModalOpen && isModalOpen && eventToShow) {
            document
                .getElementById(eventToShow.eventId)
                .classList.add("selected-event");
        }

        // remove class to selected event when modal closing
        if (prevProps.isModalOpen && !isModalOpen && prevProps.eventToShow) {
            document
                .getElementById(eventToShow.eventId)
                .classList.remove("selected-event");
        }
    }

    componentWillUnmount() {
        // remove event listener
        document.removeEventListener("keydown", this.escKeyDownHandler);
    }

    closeModalClickHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        this.props.closeModal();
    };

    render() {
        const { isEditMode, eventToShow, isModalOpen } = this.props;

        let event = DEFAULT_EVENT;
        if (eventToShow) event = eventToShow;

        const { title, location, description, color, startAt, endAt } = event;
        const defaultHeaderStyle = {
            backgroundColor: toHexColor(color)
        };

        return ReactDOM.createPortal(
            <div
                className={
                    isModalOpen ? "event-modal modal-is-visible" : "event-modal"
                }
            >
                <div
                    className="cover-layer"
                    onClick={this.closeModalClickHandler}
                />
                <div className="event-form">
                    <div className="header" style={defaultHeaderStyle}>
                        <div className="content">
                            <span className="event-date">{`${toTimeString(
                                startAt
                            )} - ${toTimeString(endAt)}`}</span>
                            <h3 className="event-name">{title}</h3>
                        </div>
                    </div>

                    <div className="body">
                        <div className="event-info">
                            {location && (
                                <span className="event-location">
                                    {location}
                                </span>
                            )}
                            <div className="event-description">
                                {description}
                            </div>
                        </div>
                        <div className="buttons-bar">
                            <IconButton aria-label="Edit">
                                <EditIcon style={{ width: 28, height: 28 }} />
                            </IconButton>
                            <IconButton aria-label="Delete">
                                <DeleteIcon style={{ width: 28, height: 28 }} />
                            </IconButton>
                        </div>
                    </div>

                    <a
                        href="#0"
                        className="close"
                        onClick={this.closeModalClickHandler}
                    >
                        Close
                    </a>
                </div>
            </div>,
            eventModalRoot
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventModal);
