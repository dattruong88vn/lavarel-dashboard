import React from "react";
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from "./commission_document/App";
import store from "./commission_document/store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);