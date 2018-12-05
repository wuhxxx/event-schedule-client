import React, { Component } from "react";
import classTogglerBuilder from "../tools/classTogglerBuilder.js";
import { userFormInputValidators } from "../tools/validators.js";
import { EMAIL, PASSWORD } from "../constants.js";

import "../styles/UserForm.css";

export default class LoginForm extends Component {
    state = {
        isPasswordHidden: true,
        [EMAIL]: {
            value: "",
            hasError: false
        },
        [PASSWORD]: {
            value: "",
            hasError: false
        }
    };

    handleInputValueChange = event => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        // only validate input value only target has
        const hasError = value ? userFormInputValidators[name](value) : false;
        this.setState({
            [name]: { value, hasError }
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
        console.log("log in form", event.target.value);
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
                        className="cd-signin-modal__label cd-signin-modal__label--email cd-signin-modal__label--image-replace"
                        htmlFor="signin-email"
                    >
                        E-mail
                    </label>
                    <input
                        id="signin-email"
                        type="email"
                        placeholder="E-mail"
                        name={EMAIL}
                        value={this.state[EMAIL].value}
                        onChange={this.handleInputValueChange}
                        className={this.toggleInputClassBy(
                            this.state[EMAIL].hasError
                        )}
                    />
                    <span
                        className={this.toggleSpanClassBy(
                            this.state[EMAIL].hasError
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
                        name={PASSWORD}
                        value={this.state[PASSWORD].value}
                        onChange={this.handleInputValueChange}
                        type={this.state.isPasswordHidden ? "password" : "text"}
                        className={this.toggleInputClassBy(
                            this.state[PASSWORD].hasError
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
                            this.state[PASSWORD].hasError
                        )}
                    >
                        Error message here!
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <input
                        type="checkbox"
                        id="remember-me"
                        className="cd-signin-modal__input"
                        ref={ele => (this.checkBox = ele)}
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
