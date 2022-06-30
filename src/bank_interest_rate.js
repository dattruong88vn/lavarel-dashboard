import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./bank_interest_rate/components/App";
import store from "./bank_interest_rate/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('bank-interest-rate')
);