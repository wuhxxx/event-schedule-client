import React, { Component } from "react";
import classTogglerBuilder from "../tools/classTogglerBuilder.js";

import "../styles/UserForm.css";

export default class ResetForm extends Component {
    state = {
        isEmailError: false
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
                        htmlFor="reset-email"
                    >
                        E-mail
                    </label>
                    <input
                        id="reset-email"
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
                    <input
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding"
                        type="submit"
                        // origin: value="Reset password"
                        value="Delete account"
                    />
                </p>
            </form>
        );
    }
}
