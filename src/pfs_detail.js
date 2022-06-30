import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./mortgage/components/App";
import store from "./mortgage/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('pfs-detail')
);