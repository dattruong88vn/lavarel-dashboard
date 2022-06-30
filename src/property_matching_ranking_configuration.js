import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./property_matching_ranking_configuration/components/App";
import store from "./property_matching_ranking_configuration/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('property_matching_ranking_configuration')
);