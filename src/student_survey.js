import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import App from "./student_survey/components/App";
import store from "./student_survey/store";

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);