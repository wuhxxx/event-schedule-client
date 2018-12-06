import React, { Component } from "react";
import classTogglerBuilder from "../../tools/classTogglerBuilder.js";
import { userFormInputValidators } from "../../tools/validators.js";
import { EMAIL } from "../../constants.js";

import "../../styles/UserForm.css";

export default class ResetForm extends Component {
    state = {
        isEmailError: false,
        [EMAIL]: {
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

    toggleInputClassBy = classTogglerBuilder(
        "cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border",
        "cd-signin-modal__input--has-error"
    );

    toggleSpanClassBy = classTogglerBuilder(
        "cd-signin-modal__error",
        "cd-signin-modal__error--is-visible"
    );

    handleSubmit = event => {
        console.log("reset form", event.target.value);
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
                        htmlFor="reset-email"
                    >
                        E-mail
                    </label>
                    <input
                        id="reset-email"
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
                        {this.state[EMAIL].hasError}
                    </span>
                </p>

                <p className="cd-signin-modal__fieldset">
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding"
                        type="submit"
                        // origin: value="Reset password"
                        value="Reset account"
                    />
                </p>
            </form>
        );
    }
}
