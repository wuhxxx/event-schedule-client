import React, { Component } from "react";
import { createStore, compose, applyMiddleware } from "redux";
import { ToastContainer } from "react-toastify";
import { TOAST_POSITION, TOAST_AUTO_CLOSE } from "../constants.js";
import { Provider } from "react-redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import TopBar from "./TopBar";
import Schedule from "./Schedule";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/App.css";

const middlewares = [thunk];

const store = createStore(
    reducer,
    compose(
        applyMiddleware(...middlewares),
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

class App extends Component {
    constructor(props) {
        super(props);
        // check if token exists or valid at initialization
    }
    render() {
        return (
            <Provider store={store}>
                <div>
                    <TopBar />
                    <Schedule />
                    <ToastContainer
                        position={TOAST_POSITION}
                        autoClose={TOAST_AUTO_CLOSE}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnVisibilityChange
                        draggable
                        pauseOnHover
                    />
                </div>
            </Provider>
        );
    }
}

export default App;
