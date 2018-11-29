import React, { Component } from "react";

import "../styles/UserForm.css";

export default class SignupForm extends Component {
    state = {
        isPasswordHidden: true
    };

    toggleHidePassword = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState(prevState => ({
            isPasswordHidden: !prevState.isPasswordHidden
        }));
    };

    render() {
        return (
            <form className="cd-signin-modal__form">
                <p className="cd-signin-modal__fieldset">
                    <label
                        className="cd-signin-modal__label cd-signin-modal__label--username cd-signin-modal__label--image-replace"
                        htmlFor="signup-username"
                    >
                        Username
                    </label>
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border"
                        id="signup-username"
                        type="text"
                        placeholder="Username"
                    />
                    <span className="cd-signin-modal__error">
                        Error message here!
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <label
                        className="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace"
                        htmlFor="signup-email"
                    >
                        E-mail
                    </label>
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border"
                        id="signup-email"
                        type="email"
                        placeholder="E-mail"
                    />
                    <span className="cd-signin-modal__error">
                        Error message here!
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <label
                        className="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace"
                        htmlFor="signup-password"
                    >
                        Password
                    </label>
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border"
                        id="signup-password"
                        placeholder="Password"
                        type={this.state.isPasswordHidden ? "password" : "text"}
                    />
                    <a
                        href="#0"
                        className="cd-signin-modal__hide-password js-hide-password"
                        onClick={this.toggleHidePassword}
                    >
                        {this.state.isPasswordHidden ? "Show" : "Hide"}
                    </a>
                    <span className="cd-signin-modal__error">
                        Error message here!
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <input
                        type="checkbox"
                        id="accept-terms"
                        className="cd-signin-modal__input"
                    />
                    <label htmlFor="accept-terms" className="checkBox-label">
                        I agree to the <a href="#0">Terms</a>
                    </label>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding"
                        type="submit"
                        value="Create account"
                    />
                </p>
            </form>
        );
    }
}
