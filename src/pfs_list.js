import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./pfs_list/components/App";
import store from "./pfs_list/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('pfs-list')
);