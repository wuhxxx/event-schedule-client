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
        console.log("Click cover layer");
        event.preventDefault();
        event.stopPropagation();
        if (event.target.classList.contains("js-signin-modal"))
            this.props.closeModal();
    };

    handleClickCloseButton = event => {
        console.log("Click close button");
        event.preventDefault();
        event.stopPropagation();
        if (event.target.classList.contains("js-close"))
            this.props.closeModal();
    };

    render() {
        return ReactDOM.createPortal(
            <div
                onKeyDown={this.handleESCKeyDown}
                onClick={this.handleClickCoverLayer}
                tabIndex="-1"
                ref={node => (this.mountedDOMNode = node)}
                className={
                    // class js-signin-modal is used to distinguish between cover layer and form
                    // click on cover layer triggers closing modal, form will not
                    this.props.isModalOpen
                        ? "cd-signin-modal js-signin-modal cd-signin-modal--is-visible"
                        : "cd-signin-modal js-signin-modal"
                }
            >
                {/* this is the entire modal form, including the background */}

                <div className="cd-signin-modal__container">
                    {/* this is the container wrapper */}

                    <ul className="cd-signin-modal__switcher js-signin-modal-switcher js-signin-modal-trigger">
                        {/* Signin/Signup tabs */}
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
                        {/* reset password entry, no plan to implement yet */}
                        <p className="cd-signin-modal__bottom-message js-signin-modal-trigger">
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_RESET}
                                onClick={this.props.openModalWithForm}
                            >
                                Forgot your password?
                            </a>
                        </p>
                    </div>
                    {/* cd-signin-modal__block */}
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
                    {/* cd-signin-modal__block */}

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
                            Your account will be deleted.
                        </p>
                        <ResetForm />
                        <p className="cd-signin-modal__bottom-message js-signin-modal-trigger">
                            <a
                                href="#0"
                                data-form={LOGINMODAL_FORM_SIGNIN}
                                onClick={this.props.openModalWithForm}
                            >
                                Back to log-in
                            </a>
                        </p>
                    </div>
                    {/* cd-signin-modal__block */}
                    <a
                        href="#0"
                        className="cd-signin-modal__close js-close"
                        onClick={this.handleClickCloseButton}
                    >
                        Close
                    </a>
                </div>
                {/* cd-signin-modal__container */}
                {/* cd-signin-modal */}
            </div>,
            loginModalRoot
        );
    }
}
