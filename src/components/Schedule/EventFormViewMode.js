import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import { toTimeString } from "../../utils/timeConverters.js";
import { toHexColor } from "../../utils/colorConverters.js";
import { DEFAULT_EVENT } from "../../constants";
import { deleteEvents } from "../../actions/eventActions.js";

import "../../styles/EventForm.css";

class EventFormViewMode extends Component {
    static propTypes = {
        event: PropTypes.object,
        isUserLoggedIn: PropTypes.bool,
        setEditMode: PropTypes.func.isRequired,
        deleteEvents: PropTypes.func.isRequired,
        handleCloseModal: PropTypes.func.isRequired
    };

    handleEditOnClick = event => {
        event.preventDefault();
        this.props.setEditMode();
    };

    handleDeleteOnClick = event => {
        event.preventDefault();
        const idArray = this.props.event ? [this.props.event.eventId] : [];
        // dispatch delete event action
        this.props.deleteEvents(idArray);
        // close modal and fire toast
        this.props.handleCloseModal();
        toast("✂️ Event deleted!");
    };

    render() {
        const { handleCloseModal } = this.props;
        const event = this.props.event ? this.props.event : DEFAULT_EVENT;
        const { title, location, description, color, startAt, endAt } = event;
        const headerStyle = { backgroundColor: toHexColor(color) };

        return (
            <div className="event-form">
                <div className="header" style={headerStyle}>
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
                            <span className="event-location">{location}</span>
                        )}
                        <div className="event-description">{description}</div>
                    </div>
                    <div className="buttons-bar">
                        <IconButton
                            aria-label="Edit"
                            style={{ marginLeft: 15 }}
                            onClick={this.handleEditOnClick}
                        >
                            <EditIcon style={{ width: 28, height: 28 }} />
                        </IconButton>
                        <IconButton
                            aria-label="Delete"
                            style={{ marginLeft: 15 }}
                            onClick={this.handleDeleteOnClick}
                        >
                            <DeleteIcon style={{ width: 28, height: 28 }} />
                        </IconButton>
                    </div>
                </div>

                <a href="#0" className="close" onClick={handleCloseModal}>
                    Close
                </a>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn: state.User.isUserLoggedIn
});

const mapDispatchToProps = { deleteEvents };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventFormViewMode);
