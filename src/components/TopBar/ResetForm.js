import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import classTogglerBuilder from "../../tools/classTogglerBuilder.js";
import { userFormInputValidators } from "../../tools/validators.js";
import {
    LOGINMODAL_FORM_SIGNIN,
    LOGINMODAL_FORM_SIGNUP,
    EMAIL,
    USER_API_ROUTE,
    USER_ERRORS
} from "../../constants.js";

import "../../styles/UserForm.css";

export default class ResetForm extends Component {
    static propTypes = {
        closeModal: PropTypes.func,
        openModalWithForm: PropTypes.func
    };

    state = {
        isEmailError: false,
        [EMAIL]: {
            value: "",
            hasError: false
        },
        isWaitingApi: false
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
        event.preventDefault();
        // check if required field is empty
        const emailInput = this.state[EMAIL].value;
        if (!emailInput) {
            const errorMessage = "This field is required";
            return this.setState({
                [EMAIL]: { value: emailInput, hasError: errorMessage }
            });
        }
        // set state to indicate waiting api response
        this.setState({ isWaitingApi: true });
        // make a request to api
        axios
            .delete(`${USER_API_ROUTE}`, { data: { email: emailInput } })
            .then(res => {
                console.log(res);
                toast.info("☠️ Account deleted!");
                this.props.openModalWithForm(LOGINMODAL_FORM_SIGNUP)();
            })
            .catch(err => {
                if (err.response) {
                    const errorRes = err.response.data.error;
                    if (errorRes.name === USER_ERRORS.UserNotFound)
                        this.setState({
                            [EMAIL]: {
                                value: emailInput,
                                hasError: "Cannot find account with this email"
                            }
                        });
                } else {
                    // network error
                    console.log(err);
                    toast.warn("😱 Something wrong with the connection.");
                }
                this.setState({ isWaitingApi: false });
            });
    };

    render() {
        return (
            <div className="cd-signin-modal__block cd-signin-modal__block--is-selected">
                <p className="cd-signin-modal__message">
                    {/* Original message: Lost your password? Please enter your email address.
                You will receive a link to create a new password. */}
                    Lost your password? Please enter your email address. Your
                    account will be reset.
                </p>
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
                            value={
                                this.state.isWaitingApi
                                    ? "Waiting response..."
                                    : "Reset account"
                            }
                        />
                    </p>
                </form>
                <p className="cd-signin-modal__bottom-message">
                    <a
                        href="#0"
                        onClick={this.props.openModalWithForm(
                            LOGINMODAL_FORM_SIGNIN
                        )}
                    >
                        Back to log-in
                    </a>
                </p>
            </div>
        );
    }
}
