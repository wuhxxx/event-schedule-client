import React, { Component } from "react";
import classTogglerBuilder from "../tools/classTogglerBuilder.js";

import "../styles/UserForm.css";

export default class LoginForm extends Component {
    state = {
        isPasswordHidden: true,
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
                        className="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace"
                        htmlFor="signin-email"
                    >
                        E-mail
                    </label>
                    <input
                        id="signin-email"
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
                        User exisited!
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <label
                        className="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace"
                        htmlFor="signin-password"
                    >
                        Password
                    </label>
                    <input
                        id="signin-password"
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
                        id="remember-me"
                        defaultChecked
                        className="cd-signin-modal__input"
                    />
                    <label htmlFor="remember-me" className="checkBox-label">
                        Remember me
                    </label>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width"
                        type="submit"
                        value="Login"
                    />
                </p>
            </form>
        );
    }
}
