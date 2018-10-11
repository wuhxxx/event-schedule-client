import React, { Component } from "react";

class TopBar extends Component {
    render() {
        return (
            <header className="cd-main-header">
                <div className="cd-main-header__logo">
                    <a href="#0">
                        {/* <img src="img/cd-logo.svg" alt="Logo" /> */}
                        Weekly Scheduler
                    </a>
                </div>

                <nav className="cd-main-nav js-main-nav">
                    <ul className="cd-main-nav__list js-signin-modal-trigger">
                        <li>
                            <a
                                className="cd-main-nav__item cd-main-nav__item--signin"
                                href="#0"
                                data-signin="login"
                            >
                                Sign in
                            </a>
                        </li>
                        <li>
                            <a
                                className="cd-main-nav__item cd-main-nav__item--signup"
                                href="#0"
                                data-signin="signup"
                            >
                                Sign up
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default TopBar;
