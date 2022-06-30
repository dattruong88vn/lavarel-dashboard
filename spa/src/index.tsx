import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
import "./material/scss/index.scss";
import AdminApp from "./AdminApp";
export * from "./model";
export * from "./components/utils";

ReactDOM.render(
    <Provider store={store}>
        <AdminApp />
    </Provider>,
    document.getElementById("spa-main")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
