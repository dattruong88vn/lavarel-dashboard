import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./report_agent_tpa/components/App";
import store from "./report_agent_tpa/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);