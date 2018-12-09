import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoginModal from "./LoginModal.js";
import {
    LOGINMODAL_FORM_RESET,
    LOGINMODAL_FORM_SIGNIN,
    LOGINMODAL_FORM_SIGNUP
} from "../../constants.js";

import logo from "../../assets/images/cd-logo.svg";
import "../../styles/TopBar.css";

class TopBar extends Component {
    static propTypes = {
        isUserLoggedIn: PropTypes.bool,
        username: PropTypes.string,
        authToken: PropTypes.string
    };

    state = {
        isNavListVisible: false,
        isModalOpen: false,
        formToOpen: LOGINMODAL_FORM_SIGNIN
    };

    // if width of web page is more than 768px,
    // nav's child node ul will overlap nav,
    // at this time, click's event.target is ul.
    // Only set state to toggle li open/close when in mobile
    navClickHandler = event => {
        event.preventDefault();
        event.stopPropagation();
        // check event target's tagName, only set state when it's "NAV"
        if (event.target.tagName === "NAV") {
            this.setState(prevState => ({
                isNavListVisible: !prevState.isNavListVisible
            }));
        }
    };

    componentDidMount() {
        console.log("TopBar did mount");
        console.dir(this.state);
        // console.log("TopBar, this.modalRef = ", this.modalRef);
    }

    componentDidUpdate() {
        console.log("TopBar did update");
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log("TopBar did receive new props");
    // set axios auth token
    // return new state according to new props or null, merge to state
    //     const { isUserLoggedIn, username, token } = nextProps;
    //     return { isUserLoggedIn, username, token };
    // }

    // open modal with specific form
    openModalWithForm = formToOpen => event => {
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        // make sure formToOpen is one of three defined forms
        if (
            formToOpen === LOGINMODAL_FORM_RESET ||
            formToOpen === LOGINMODAL_FORM_SIGNIN ||
            formToOpen === LOGINMODAL_FORM_SIGNUP
        )
            this.setState({ isModalOpen: true, formToOpen });
        else return;
    };

    closeModal = event => {
        if (event) event.preventDefault();
        this.setState({ isModalOpen: false });
    };

    render() {
        let navListClassSet = "cd-main-nav__list js-signin-modal-trigger";
        if (this.state.isNavListVisible)
            navListClassSet =
                "cd-main-nav__list js-signin-modal-trigger cd-main-nav__list--is-visible";

        return (
            <div>
                <header className="cd-main-header">
                    <div className="cd-main-header__logo">
                        <img src={logo} alt="Logo" />
                        <span className="header-title">Event Schedule</span>
                        {/* <a
                            className="header-githubLogo"
                            href="https://github.com/wuhxxx/event-schedule-client"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img src={githubLogo} alt="githubLogo" />
                        </a> */}
                    </div>

                    <nav className="cd-main-nav" onClick={this.navClickHandler}>
                        <ul className={navListClassSet}>
                            <li>
                                <a
                                    className="cd-main-nav__item cd-main-nav__item--signin"
                                    href="#0"
                                    onClick={this.openModalWithForm(
                                        LOGINMODAL_FORM_SIGNIN
                                    )}
                                >
                                    Sign in
                                </a>
                            </li>
                            <li>
                                <a
                                    className="cd-main-nav__item cd-main-nav__item--signup"
                                    href="#0"
                                    onClick={this.openModalWithForm(
                                        LOGINMODAL_FORM_SIGNUP
                                    )}
                                >
                                    Sign up
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
                {/* if simply mount and unmout modal according to state, 
                there will be no animation for modal */}
                <LoginModal
                    isModalOpen={this.state.isModalOpen}
                    formToOpen={this.state.formToOpen}
                    closeModal={this.closeModal}
                    openModalWithForm={this.openModalWithForm}
                    // ref={modalRef => (this.modalRef = modalRef)}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.user.isUserLoggedIn,
        username: state.user.username,
        authToken: state.user.authToken
    };
};

export default connect(mapStateToProps)(TopBar);
