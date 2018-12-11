/********************** local storage related constants **********************/
export const LOCAL_USERNAME_KEY = "USERNAME_KEY";
export const LOCAL_TOKEN_KEY = "TOKEN_KEY";
export const LOCAL_EXPIRESAT_KEY = "EXPIRESAT_KEY";

/********************** API related constants **********************/
// api route
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

/********************** Schedule related constants **********************/
// unit of timeline, initially 30 minutes per timeline point
export const TIME_UNIT = 30;
// default timeline start time;
export const DEFAULT_FROM = 9 * 2 * 30;
// default timeline end time;
export const DEFAULT_TO = 18 * 2 * 30;

/********************** TopBar related constants **********************/
// login modal states
export const LOGINMODAL_FORM_SIGNIN = "Signin";
export const LOGINMODAL_FORM_RESET = "Reset";
export const LOGINMODAL_FORM_SIGNUP = "Signup";
// login/signup form input field name
export const USERNAME = "username";
export const EMAIL = "email";
export const PASSWORD = "password";

/********************** Toast related constants **********************/
export const TOAST_AUTO_CLOSE = 3500; // unit: milesecond
// position choose from ["top-left", "top-right", top-center", "bottom-left", "bottom-right", "bottom-center"]
export const TOAST_POSITION = "top-center";
