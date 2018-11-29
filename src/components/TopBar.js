import React, { Component } from "react";
import LoginModal from "./LoginModal.js";
import {
    LOGINMODAL_FORM_ATTRIBUTE_NAME,
    LOGINMODAL_FORM_SIGNIN,
    LOGINMODAL_FORM_SIGNUP
} from "../constants.js";

import logo from "../assets/images/cd-logo.svg";
import "../styles/TopBar.css";

export default class TopBar extends Component {
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
        console.log("TopBar, this.modalRef = ", this.modalRef);
    }

    componentDidUpdate() {
        console.log("TopBar did update");
    }

    // open modal with specific form
    openModalWithForm = event => {
        console.log("Open modal");
        event.preventDefault();
        event.stopPropagation();
        const formToOpen = event.target.getAttribute(
            LOGINMODAL_FORM_ATTRIBUTE_NAME
        );
        if (formToOpen)
            this.setState({ isModalOpen: true, formToOpen: formToOpen });
        else return;
    };

    closeModal = () => {
        console.log("Close modal");
        this.setState({ isModalOpen: false });
    };

    render() {
        let navListClassSet = "cd-main-nav__list js-signin-modal-trigger";
        if (this.state.isNavListVisible)
            navListClassSet =
                "cd-main-nav__list js-signin-modal-trigger cd-main-nav__list--is-visible";

        return (
            <div
            // onKeyDown={event => {
            //     console.log("Key down on topbar");
            //     if (event.keyCode === 27) {
            //         event.stopPropagation();
            //         this.closeModal();
            //     }
            // }}
            >
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
                                    data-form={LOGINMODAL_FORM_SIGNIN}
                                    onClick={this.openModalWithForm}
                                >
                                    Sign in
                                </a>
                            </li>
                            <li>
                                <a
                                    className="cd-main-nav__item cd-main-nav__item--signup"
                                    href="#0"
                                    data-form={LOGINMODAL_FORM_SIGNUP}
                                    onClick={this.openModalWithForm}
                                >
                                    Sign up
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <LoginModal
                    isModalOpen={this.state.isModalOpen}
                    formToOpen={this.state.formToOpen}
                    closeModal={this.closeModal}
                    openModalWithForm={this.openModalWithForm}
                    ref={modalRef => (this.modalRef = modalRef)}
                />
            </div>
        );
    }
}
