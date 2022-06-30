import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./log_score_card/components/App";
import store from "./log_score_card/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('log_score_card')
);