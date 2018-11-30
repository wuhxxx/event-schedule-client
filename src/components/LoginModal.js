import React, { Component } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
    LOGINMODAL_FORM_SIGNIN,
    LOGINMODAL_FORM_RESET,
    LOGINMODAL_FORM_SIGNUP
} from "../constants.js";
import LoginForm from "./LoginForm.js";
import SignupForm from "./SignupForm.js";
import ResetForm from "./ResetForm.js";
import "../styles/LoginModal.css";

// login modal root in index.html
const loginModalRoot = document.getElementById("login-modal-root");

// ESC key code
const ESC_KEY = 27;

export default class LoginModal extends Component {
    // prop types
    static propTypes = {
        isModalOpen: PropTypes.bool,
        formToOpen: PropTypes.string,
        closeModal: PropTypes.func,
        openModalWithForm: PropTypes.func
    };

    componentDidMount() {
        console.log("LoginModal did mount");
        console.log("this.DOMNode = ", this.mountedDOMNode);
    }

    componentDidUpdate() {
        console.log("LoginModal did update");
        // todo: get rid of setTimeout()
        if (this.props.isModalOpen) {
            console.log("before execute focus");
            console.log(document.activeElement);
            console.log("modal dom node:", this.mountedDOMNode);
            // ReactDOM.findDOMNode(this).focus();
            // this.mountedDOMNode.focus();
            // console.log("after execute focus");
            // console.log(document.activeElement);
            setTimeout(() => {
                // ReactDOM.findDOMNode(this).focus();
                this.mountedDOMNode.focus();
                console.log("after execute focus");
                console.log(document.activeElement);
            }, 30);
            // if timeout is 10, focus won't work
            // timeout 11 ~ 20, sometimes works
        }
    }

    handleESCKeyDown = event => {
        console.log("Key down on modal");
        event.stopPropagation();
        if (event.keyCode === ESC_KEY) {
            this.props.closeModal();
        }
    };

    handleClickCoverLayer = event => {
        console.log("click cover layer");
        event.stopPropagation();
        // if (event.target.getAttribute("data-iscoverlayer"))
        this.props.closeModal();
    };

    handleClickCloseButton = event => {
        console.log("Click close button");
        event.preventDefault();
        event.stopPropagation();
        // if (event.target.classList.contains("js-close"))
        this.props.closeModal();
    };

    render() {
        return ReactDOM.createPortal(
            <div
                onKeyDown={this.handleESCKeyDown}
                tabIndex="-1"
                ref={node => (this.mountedDOMNode = node)}
                className={
                    // deleted class js-signin-modal,
                    // which is used to distinguish between cover layer and form
                    this.props.isModalOpen
                        ? "cd-signin-modal cd-signin-modal--is-visible"
                        : "cd-signin-modal"
                }
            >
                {/* Cover Layer */}
                <div
                    data-iscoverlayer="true"
                    className="login-modal-cover-layer"
                    onClick={this.handleClickCoverLayer}
                />

                {/* Forms Container */}
                <div className="cd-signin-modal__container">
                    {/* Signin/Signup tabs */}
                    <ul className="cd-signin-modal__switcher js-signin-modal-switcher">
                        <li>
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_SIGNIN}
                                onClick={this.props.openModalWithForm}
                                data-type="login"
                                className={
                                    this.props.formToOpen ===
                                        LOGINMODAL_FORM_SIGNIN ||
                                    this.props.formToOpen ===
                                        LOGINMODAL_FORM_RESET
                                        ? "cd-selected"
                                        : ""
                                }
                            >
                                Sign in
                            </a>
                        </li>
                        <li>
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_SIGNUP}
                                onClick={this.props.openModalWithForm}
                                data-type="signup"
                                className={
                                    this.props.formToOpen ===
                                    LOGINMODAL_FORM_SIGNUP
                                        ? "cd-selected"
                                        : ""
                                }
                            >
                                New account
                            </a>
                        </li>
                    </ul>

                    {/* Login Form */}
                    <div
                        data-type="login"
                        className={
                            // deleted class: js-signin-modal-block
                            this.props.formToOpen === LOGINMODAL_FORM_SIGNIN
                                ? "cd-signin-modal__block cd-signin-modal__block--is-selected"
                                : "cd-signin-modal__block"
                        }
                    >
                        <LoginForm />
                        {/* reset password entry, just delete account */}
                        <p className="cd-signin-modal__bottom-message">
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_RESET}
                                onClick={this.props.openModalWithForm}
                            >
                                Forgot your password?
                            </a>
                        </p>
                    </div>

                    {/* Signup Form */}
                    <div
                        data-type="signup"
                        className={
                            // deleted class: js-signin-modal-block
                            this.props.formToOpen === LOGINMODAL_FORM_SIGNUP
                                ? "cd-signin-modal__block cd-signin-modal__block--is-selected"
                                : "cd-signin-modal__block"
                        }
                    >
                        <SignupForm />
                    </div>

                    {/* reset password form, just delete account */}
                    <div
                        className={
                            // deleted class: js-signin-modal-block
                            this.props.formToOpen === LOGINMODAL_FORM_RESET
                                ? "cd-signin-modal__block cd-signin-modal__block--is-selected"
                                : "cd-signin-modal__block"
                        }
                        data-type="reset"
                    >
                        <p className="cd-signin-modal__message">
                            {/* Original message: Lost your password? Please enter your email address.
                            You will receive a link to create a new password. */}
                            Lost your password? Please enter your email address.
                            Your account will be reset.
                        </p>
                        <ResetForm />
                        <p className="cd-signin-modal__bottom-message">
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_SIGNIN}
                                onClick={this.props.openModalWithForm}
                            >
                                Back to log-in
                            </a>
                        </p>
                    </div>
                    <a
                        href="#0"
                        className="cd-signin-modal__close"
                        onClick={this.handleClickCloseButton}
                    >
                        Close
                    </a>
                </div>
            </div>,
            loginModalRoot
        );
    }
}
