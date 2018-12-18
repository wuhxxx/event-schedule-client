/********************** local storage related constants **********************/
export const LOCAL_USERNAME_KEY = "USERNAME_KEY";
export const LOCAL_TOKEN_KEY = "TOKEN_KEY";
export const LOCAL_EXPIRESAT_KEY = "EXPIRESAT_KEY";

/********************** Schedule related constants **********************/
// unit length of timeline
export const TIME_UNIT = 30;
// default timeline start time;
export const DEFAULT_FROM = 9 * 2 * 30;
// default timeline end time;
export const DEFAULT_TO = 18 * 2 * 30;
// week days
export const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

/********************** TopBar related constants **********************/
// login modal states
export const LOGINMODAL_FORM_SIGNIN = "Signin";
export const LOGINMODAL_FORM_RESET = "Reset";
export const LOGINMODAL_FORM_SIGNUP = "Signup";
// login/signup form input fields
export const USERNAME = "USERNAME";
export const EMAIL = "EMAIL";
export const PASSWORD = "PASSWORD";
// login/signup form input fields error
export const USERNAME_ERROR = "USERNAME_ERROR";
export const EMAIL_ERROR = "EMAIL_ERROR";
export const PASSWORD_ERROR = "PASSWORD_ERROR";

/********************** API related constants **********************/
// api routes
export const USER_API_ROUTE = "http://localhost:2333/api/v1/users";
export const EVENT_API_ROUTE = "http://localhost:2333/api/v1/events";
// Authentication header prefix
export const AUTH_HEADER = "Bearer";
// least token available time span required
export const LEAST_AVAILABLE_TIME = 1000 * 60 * 60 * 4; // 4 hours
// backend error responses
export const AUTH_ERRORS = {
    Unauthorized: "Unauthorized",
    InvalidToken: "JsonWebTokenError",
    TokenExpired: "TokenExpiredError",
    DeletedUser: "DeletedUser"
};

export const USER_ERRORS = {
    EmailRegistered: "EmailRegistered",
    UserNotFound: "UserNotFound",
    WrongPassword: "WrongPassword"
};

export const EVENT_ERRORS = { EventNotFound: "EventNotFound" };

/********************** demo events **********************/
// comes from codyHouse simple-schedule template
export { default as DEMO_EVENTS } from "./demoEvents.js";
