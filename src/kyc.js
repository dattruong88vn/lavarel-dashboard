import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./kyc/App";
import store from "./kyc/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);