import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./list_tc/components/App";
import store from "./list_tc/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);