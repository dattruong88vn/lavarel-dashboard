import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./pfs_overview_request/components/App";
import store from "./pfs_overview_request/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('pfs-list')
);