import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import ModalCheckingPlanningContainer from "./deal_checking_planning/containers/ModalCheckingPlanningContainer";
import store from "./deal_checking_planning/store";

ReactDOM.render(
  <Provider store={store}>
  	<ModalCheckingPlanningContainer />
  </Provider>,
  document.getElementById('modal-checking-planning')
);