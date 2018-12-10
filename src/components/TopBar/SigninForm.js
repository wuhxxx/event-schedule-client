import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { signUserIn } from "../../actions/userActions.js";
import classTogglerBuilder from "../../utils/classTogglerBuilder.js";
import { userFormInputValidators } from "../../utils/validators.js";
import {
    LOGINMODAL_FORM_RESET,
    EMAIL,
    PASSWORD,
    USER_API_ROUTE,
    USER_ERRORS
} from "../../constants.js";

import "../../styles/UserForm.css";

class SigninForm extends Component {
    static propTypes = {
        closeModal: PropTypes.func,
        openModalWithForm: PropTypes.func,
        dispatch: PropTypes.func
    };

    state = {
        isPasswordHidden: true,
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
        const fields = [EMAIL, PASSWORD];
        const errorMessage = "This field is required";
        const user = {};
        for (let i = 0; i < fields.length; i++) {
            let input = this.state[fields[i]].value;
            if (!input) {
                return this.setState({
                    [fields[i]]: { value: input, hasError: errorMessage }
                });
            }
            user[fields[i]] = input;
        }
        // set state to indicate waiting api response
        this.setState({ isWaitingApi: true });
        // make a request to api
        axios
            .post(`${USER_API_ROUTE}/login`, user)
            .then(res => {
                // console.log(res);
                console.log(res.data.data);
                toast.info("🎉 You are logged in!");
                this.setState({ isWaitingApi: false });
                this.props.closeModal();
                // dispatch signin action
                this.props.dispatch(
                    signUserIn(res.data.data, this.checkBox.checked)
                );
            })
            .catch(err => {
                if (err.response) {
                    const errorRes = err.response.data.error;
                    console.log(errorRes);
                    if (errorRes.name === USER_ERRORS.UserNotFound) {
                        this.setState({
                            [EMAIL]: {
                                value: user[EMAIL],
                                hasError: "Cannot find account with this email"
                            }
                        });
                    }
                    if (errorRes.name === USER_ERRORS.WrongPassword) {
                        this.setState({
                            [PASSWORD]: {
                                value: user[PASSWORD],
                                hasError: "Wrong password"
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
                            {this.state[EMAIL].hasError}
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
                            value={
                                this.state.isWaitingApi
                                    ? "Waiting response..."
                                    : "Login"
                            }
                        />
                    </p>
                </form>
                {/* bottom message, reset form entry */}
                <p className="cd-signin-modal__bottom-message">
                    <a
                        href="#0"
                        onClick={this.props.openModalWithForm(
                            LOGINMODAL_FORM_RESET
                        )}
                    >
                        reset your account?
                    </a>
                </p>
            </div>
        );
    }
}

export default connect()(SigninForm);
