import axios from "axios";
import { USER_LOG_OUT, USER_SIGN_IN } from "./actionTypes.js";
import {
    AUTH_HEADER,
    LOCAL_USERNAME_KEY,
    LOCAL_AUTHTOKEN_KEY,
    LOCAL_EXPIRESAT_KEY
} from "../constants.js";

/**
 * User sign in action creator, return corresponding action,
 * also set axios auth token and save user info to local
 * @param {Object} userData response data from backend '/users' route
 * @param {Boolean} toRememberUser true if remember user
 */
export const signUserIn = (userData, toRememberUser) => {
    const { username, token, expiresIn } = userData;
    // number of milesecond at which token expires according to local time
    const expiresAt = Date.now() + expiresIn;
    // bearer token
    const authToken = `${AUTH_HEADER} ${token}`;
    // set axios auth token, this will apply to all sequential requests
    axios.defaults.headers.common["Authorization"] = authToken;
    // save to localStorage
    if (toRememberUser) {
        localStorage.setItem(LOCAL_USERNAME_KEY, username);
        localStorage.setItem(LOCAL_AUTHTOKEN_KEY, authToken);
        localStorage.setItem(LOCAL_EXPIRESAT_KEY, expiresAt);
    }
    // return action
    return {
        type: USER_SIGN_IN,
        username,
        authToken,
        expiresAt
    };
};

export const logUserOut = () => {
    // delete axios auth token, this will apply to all sequential requests
    delete axios.defaults.headers.common["Authorization"];
    // delete user info in localStorage
    localStorage.removeItem(LOCAL_USERNAME_KEY);
    localStorage.removeItem(LOCAL_AUTHTOKEN_KEY);
    localStorage.removeItem(LOCAL_EXPIRESAT_KEY);
    return {
        type: USER_LOG_OUT
    };
};
