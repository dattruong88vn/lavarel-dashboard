import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./Documents/Components/App";
import store from "./Documents/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);