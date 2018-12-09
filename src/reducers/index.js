import { combineReducers } from "redux";
import user from "./userReducer.js";
import events from "./eventsReducer.js";

export default combineReducers({
    user,
    events
});
