import React, { Component } from "react";
import logo from "../assets/images/cd-logo.svg";
import "../styles/TopBar.css";

export default class TopBar extends Component {
    state = {
        isNavListVisible: false
    };

    // when width of web page is more than 768px,
    // nav's child node ul will overlap nav,
    // at this time, click's event.target is ul.
    // Only set state to toggle li open/close when in mobile
    navClickHandler = event => {
        // check event target's tagName, only set state when it's "NAV"
        if (event.target.tagName === "NAV") {
            this.setState(prevState => ({
                ...prevState,
                isNavListVisible: !prevState.isNavListVisible
            }));
        }

        // console.dir(event.target);
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
                                >
                                    Sign in
                                </a>
                            </li>
                            <li>
                                <a
                                    className="cd-main-nav__item cd-main-nav__item--signup"
                                    href="#0"
                                >
                                    Sign up
                                </a>
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
        );
    }
}
