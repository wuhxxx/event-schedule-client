import React, { Component } from "react";

import "../styles/UserForm.css";

export default class ResetForm extends Component {
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
                        className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding cd-signin-modal__input--has-border"
                        id="reset-email"
                        type="email"
                        placeholder="E-mail"
                    />
                    <span className="cd-signin-modal__error">
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
