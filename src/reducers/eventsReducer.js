import { WEEK_DAYS, TIME_UNIT } from "../constants";
import {
    SET_EVENTS,
    ADD_EVENT,
    DELETE_EVENTS,
    UPDATE_EVENT,
    SET_ERROR,
    CLEAR_ERROR,
    LOAD_USER_EVENTS_BEGIN,
    LOAD_USER_EVENTS_FINISH,
    REQUEST_EVENT_API_BEGIN,
    REQUEST_EVENT_API_FINISH
} from "../actions/actionTypes.js";

const initialState = {
    events: [],
    error: null,
    isLoadingUserEvents: false,
    isRequestingEventAPI: false
};

// An integer array, length is ((24 hour * 60 minutes) / TIME_UNIT) + 1
// stores the number of events on all weekdays which uses this time point(index).
// This array is used to determine timeline's start time and end time
// counters: new Int8Array((24 * 60) / TIME_UNIT + 1)

// events arrays by weekday, initially empty
// for (let i = 0; i < WEEK_DAYS.length; i++) {
//     initialState[WEEK_DAYS[i]] = [];
// }

/**
 * A helper function to update time point usage counters
 * @param {Array} counters counters array, integer array
 * @param {Array} timePoints integer array, each element should be in range [0,1440]
 * @param {Boolean} isPositive boolean value indicates if increment is positive
 */
function updateCounters(counters, timePoints, isPositive) {
    let index;
    let increment = isPositive ? 1 : -1;
    for (let i = 0; i < timePoints.length; i++) {
        index = ~~(timePoints[i] / TIME_UNIT);
        counters[index] += increment;
    }
}

// A helper function for case SET_EVENTS, return the next state
function nextStateAfterSetEvents(events) {
    // previous state's events will be cleared
    // get a deep copy of initial state
    const nextState = JSON.parse(JSON.stringify(initialState));
    let event, weekdayKey;
    for (let i = 0; i < events.length; i++) {
        event = events[i];
        const { startAt, endAt, weekday } = event;
        weekdayKey = WEEK_DAYS[weekday];
        // update counters
        updateCounters(nextState.counters, [startAt, endAt], true);
        // push event to corresponding array
        nextState[weekdayKey].push(event);
    }
    return nextState;
}

// A helper funciton for case ADD_EVENT, return the next state
function nextStateAfterAddEvent(preState, event) {
    // get values
    const { weekday, startAt, endAt } = event;
    const weekdayKeyToAddEvent = WEEK_DAYS[weekday];
    const oldEvents = preState[weekdayKeyToAddEvent];
    const oldCounters = preState.counters;
    // set up new counters for next state
    const newCounters = [...oldCounters];
    updateCounters(newCounters, [startAt, endAt], true);
    // next state
    const nextState = {
        ...preState,
        [weekdayKeyToAddEvent]: [...oldEvents, event],
        counters: newCounters
    };
    return nextState;
}

// A helper funciton for case DELETE_EVENTS, return the next state
function nextStateAfterDeleteEvents(preState, event) {
    // get values
    const { weekday, startAt, endAt } = event;
    const weekdayKeyToAddEvent = WEEK_DAYS[weekday];
    const oldEvents = preState[weekdayKeyToAddEvent];
    const oldCounters = preState.counters;
    // set up new counters for next state
    const newCounters = [...oldCounters];
    updateCounters(newCounters, [startAt, endAt], true);
    // next state
    const nextState = {
        ...preState,
        [weekdayKeyToAddEvent]: [...oldEvents, event],
        counters: newCounters
    };
    return nextState;
}

//
function nextStateAfterUpdateEvent(preState, newEvent) {
    // get values
    const { weekday, startAt, endAt, eventId } = newEvent;
    const weekdayKeyToUpdate = WEEK_DAYS[weekday];
    const oldEvents = preState[weekdayKeyToUpdate];
    const oldCounters = preState.counters;
    // new counters
    const newCounters = [...oldCounters];
    // new events array of
    const newEvents = oldEvents.map(event => {
        if (eventId === event.eventId) {
            // decrement counters of old event's start and end time
            updateCounters(newCounters, [event.startAt, event.endAt], false);
            // update event
            return newEvent;
        }
        return event;
    });
    // increment counters of new event's start and end time
    updateCounters(newCounters, [startAt, endAt], true);
    // next state
    const nextState = {
        ...preState,
        [weekdayKeyToUpdate]: newEvents,
        counters: newCounters
    };
    return nextState;
}

// Event reducer
export default function(preState = initialState, action) {
    switch (action.type) {
        case SET_EVENTS:
            return {
                ...preState,
                events: action.events
            };
        case ADD_EVENT:
            return {
                ...preState,
                events: [...preState.events, action.event]
            };
        case DELETE_EVENTS:
            return {
                ...preState,
                events: preState.events.filter(
                    event => action.eventIdsToDelete.indexOf(event.eventId) < 0
                )
            };
        case UPDATE_EVENT:
            return {
                ...preState,
                events: preState.events.map(event =>
                    event.eventId === action.newEvent.eventId
                        ? action.newEvent
                        : event
                )
            };
        case SET_ERROR:
            return {
                ...preState,
                error: action.error
            };
        case CLEAR_ERROR:
            return {
                ...preState,
                error: null
            };
        case LOAD_USER_EVENTS_BEGIN:
            return {
                ...preState,
                isLoadingUserEvents: true
            };
        case LOAD_USER_EVENTS_FINISH:
            return {
                ...preState,
                isLoadingUserEvents: false
            };
        case REQUEST_EVENT_API_BEGIN:
            return {
                ...preState,
                isRequestingEventAPI: true
            };
        case REQUEST_EVENT_API_FINISH:
            return {
                ...preState,
                isRequestingEventAPI: false
            };
        default:
            return preState;
    }
}
