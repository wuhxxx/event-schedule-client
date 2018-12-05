import { USERNAME, EMAIL, PASSWORD } from "../constants.js";

// functions to validate various form inputs

/**
 * validate if it is email
 * @param {String} email
 * @returns {String} error message string or false
 */
export const validateEmail = email => {
    // see: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email) ? false : "Invalid email address";
};

/**
 * validate if username matches requirement
 * @param {String} username
 * @returns {String} error message string or false
 */
export const validateUsername = username => {
    // User name must be 2-12 long,
    // no leading/ending space or "."
    const reg = /^(?=.{2,12}$)(?![.\s])[a-zA-Z0-9._\s]+(?<![.\s])$/;
    return reg.test(username)
        ? false
        : "2~12 long, no leading/ending space or .";
};

/**
 * validate if password matches requirement
 * @param {String} password
 * @returns {String} error message string or false
 */
export const validatePassword = password => {
    // password must be 4-30 long, accepts digits, lower/upper case and !@#$%^&
    const reg = /^[a-zA-Z0-9!@#$%^&]{4,30}$/;
    return reg.test(password)
        ? false
        : "4~30 long, accepts digits, lower/upper case letters and symbols of !@#$%^&";
};

// group up user form input validators , return different validator based on target name
export const userFormInputValidators = {
    [EMAIL]: validateEmail,
    [USERNAME]: validateUsername,
    [PASSWORD]: validatePassword
};
