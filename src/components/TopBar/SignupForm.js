import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import classTogglerBuilder from "../../tools/classTogglerBuilder.js";
import { userFormInputValidators } from "../../tools/validators.js";
import {
    USERNAME,
    EMAIL,
    PASSWORD,
    USER_API_ROUTE,
    USER_ERRORS
} from "../../constants.js";

import "../../styles/UserForm.css";

export default class SignupForm extends Component {
    static propTypes = {
        closeModal: PropTypes.func,
        openModalWithForm: PropTypes.func
    };

    state = {
        isPasswordHidden: true,
        [USERNAME]: {
            value: "",
            hasError: false
        },
        [EMAIL]: {
            value: "",
            hasError: false
        },
        [PASSWORD]: {
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
        event.preventDefault();
        // check if required field is empty
        const fields = [USERNAME, EMAIL, PASSWORD];
        const errorMessage = "This field is required";
        const newUser = {};
        for (let i = 0; i < fields.length; i++) {
            let input = this.state[fields[i]].value;
            if (!input) {
                return this.setState({
                    [fields[i]]: { value: input, hasError: errorMessage }
                });
            }
            newUser[fields[i]] = input;
        }
        // set state to indicate waiting api response
        this.setState({ isWaitingApi: true });
        // make a request to api
        axios
            .post(`${USER_API_ROUTE}/signup`, newUser)
            .then(res => {
                // console.log(res);
                console.log(res.data.data);
                // dispatch login action
                toast.info("😀 You are logged in!");
                this.props.closeModal();
            })
            .catch(err => {
                if (err.response) {
                    const errorRes = err.response.data.error;
                    console.log(errorRes);
                    if (errorRes.name === USER_ERRORS.EmailRegistered) {
                        this.setState({
                            [EMAIL]: {
                                value: newUser[EMAIL],
                                hasError: "This email has been registered"
                            }
                        });
                    }
                } else {
                    // network error
                    console.log(err);
                    toast.warn("😱 Something wrong with the connection");
                }
                this.setState({ isWaitingApi: false });
            });
    };

    render() {
        return (
            <div className="cd-signin-modal__block cd-signin-modal__block--is-selected">
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
                            name={USERNAME}
                            value={this.state[USERNAME].value}
                            onChange={this.handleInputValueChange}
                            className={this.toggleInputClassBy(
                                this.state[USERNAME].hasError
                            )}
                        />
                        <span
                            className={this.toggleSpanClassBy(
                                this.state[USERNAME].hasError
                            )}
                        >
                            {this.state[USERNAME].hasError}
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
                        <label
                            className="cd-signin-modal__label cd-signin-modal__label--password cd-signin-modal__label--image-replace"
                            htmlFor="signup-password"
                        >
                            Password
                        </label>
                        <input
                            id="signup-password"
                            placeholder="Password"
                            name={PASSWORD}
                            value={this.state[PASSWORD].value}
                            onChange={this.handleInputValueChange}
                            type={
                                this.state.isPasswordHidden
                                    ? "password"
                                    : "text"
                            }
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
                            {this.state[PASSWORD].hasError}
                        </span>
                    </p>

                    <p className="cd-signin-modal__fieldset">
                        <input
                            type="checkbox"
                            id="accept-terms"
                            className="cd-signin-modal__input"
                        />
                        <label
                            htmlFor="accept-terms"
                            className="checkBox-label"
                        >
                            I agree to the <a href="#0">Terms</a>
                        </label>
                    </p>

                    <p className="cd-signin-modal__fieldset">
                        <input
                            className="cd-signin-modal__input cd-signin-modal__input--full-width cd-signin-modal__input--has-padding"
                            type="submit"
                            value={
                                this.state.isWaitingApi
                                    ? "Waiting response..."
                                    : "Create account"
                            }
                        />
                    </p>
                </form>
            </div>
        );
    }
}
