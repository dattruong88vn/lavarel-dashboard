import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from "./crawler/App";
import store from "./crawler/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);