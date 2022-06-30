import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./classify_deal_hml/components/App";
import store from "./classify_deal_hml/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('classify_deal_hml')
);