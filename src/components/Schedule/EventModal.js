import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "../../styles/EventModal.css";

// login modal root in index.html
const eventModalRoot = document.getElementById("event-modal-root");

// ESC key code
const ESC_KEY = 27;

class EventModal extends Component {
    static propTypes = {
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

    componentWillUnmount() {
        // remove event listener
        document.removeEventListener("keydown", this.escKeyDownHandler);
    }

    render() {
        return ReactDOM.createPortal(<div>a</div>, eventModalRoot);
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EventModal);
