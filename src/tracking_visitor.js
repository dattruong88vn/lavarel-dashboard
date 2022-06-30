import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./tracking_visitor/components/App";
import store from "./tracking_visitor/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);