import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import ModalContainer from "./mortgage/containers/ModalContainer";
import store from "./mortgage/store";

ReactDOM.render(
  <Provider store={store}>
  	<ModalContainer />
  </Provider>,
  document.getElementById('mortgage-modal')
);