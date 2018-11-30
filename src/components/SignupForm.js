import React, { Component } from "react";
import classTogglerBuilder from "../tools/classTogglerBuilder.js";

import "../styles/UserForm.css";

const usernameFieldName = "usernameInput",
    emailFieldName = "emailInput",
    passwordFieldName = "passwordInput";

export default class SignupForm extends Component {
    state = {
        isPasswordHidden: true,
        usernameInput: {
            hasError: false
        },
        emailInput: {
            hasError: false
        },
        passwordInput: {
            hasError: false
        }
    };

    handleInputValueChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: { value, hasError: false }
        });
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

    handleSubmit = event => {
        console.log("sign up form", event.target.value);
        event.preventDefault();
    };

    render() {
        return (
            <form
                className="cd-signin-modal__form"
                onSubmit={this.handleSubmit}
            >
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
                        name={usernameFieldName}
                        value={this.state[usernameFieldName].value}
                        onChange={this.handleInputValueChange}
                        className={this.toggleInputClassBy(
                            this.state[usernameFieldName].hasError
                        )}
                    />
                    <span
                        className={this.toggleSpanClassBy(
                            this.state[usernameFieldName].hasError
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
                        name={emailFieldName}
                        value={this.state[emailFieldName].value}
                        onChange={this.handleInputValueChange}
                        className={this.toggleInputClassBy(
                            this.state[emailFieldName].hasError
                        )}
                    />
                    <span
                        className={this.toggleSpanClassBy(
                            this.state[emailFieldName].hasError
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
                        name={passwordFieldName}
                        value={this.state[passwordFieldName].value}
                        onChange={this.handleInputValueChange}
                        type={this.state.isPasswordHidden ? "password" : "text"}
                        className={this.toggleInputClassBy(
                            this.state[passwordFieldName].hasError
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
                            this.state[passwordFieldName].hasError
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
