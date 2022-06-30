import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./change_card_type/components/App";
import store from "./change_card_type/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('change_card_type')
);