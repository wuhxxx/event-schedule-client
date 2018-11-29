import React, { Component } from "react";
import classTogglerBuilder from "../tools/classTogglerBuilder.js";

import "../styles/UserForm.css";

export default class SignupForm extends Component {
    state = {
        isPasswordHidden: true,
        isUsernameError: false,
        isEmailError: false,
        isPasswordError: false
    };

    toggleHidePassword = event => {
        event.preventDefault();
        event.stopPropagation();
        this.setState(prevState => ({
            isPasswordHidden: !prevState.isPasswordHidden
        }));
    };

    toggleInputClassBy = classTogglerBuilder(
        "cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border",
        "cd-signin-modal__input--has-error"
    );

    toggleSpanClassBy = classTogglerBuilder(
        "cd-signin-modal__error",
        "cd-signin-modal__error--is-visible"
    );

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
                        type="text"
                        placeholder="Username"
                        className={this.toggleInputClassBy(
                            this.state.isUsernameError
                        )}
                    />
                    <span
                        className={this.toggleSpanClassBy(
                            this.state.isUsernameError
                        )}
                    >
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
                        id="signup-email"
                        type="email"
                        placeholder="E-mail"
                        className={this.toggleInputClassBy(
                            this.state.isEmailError
                        )}
                    />
                    <span
                        className={this.toggleSpanClassBy(
                            this.state.isEmailError
                        )}
                    >
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
                        id="signup-password"
                        placeholder="Password"
                        type={this.state.isPasswordHidden ? "password" : "text"}
                        className={this.toggleInputClassBy(
                            this.state.isPasswordError
                        )}
                    />
                    <a
                        href="#0"
                        className="cd-signin-modal__hide-password js-hide-password"
                        onClick={this.toggleHidePassword}
                    >
                        {this.state.isPasswordHidden ? "Show" : "Hide"}
                    </a>
                    <span
                        className={this.toggleSpanClassBy(
                            this.state.isPasswordError
                        )}
                    >
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
