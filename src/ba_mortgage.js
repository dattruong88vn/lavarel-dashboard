import ReactDOM from 'react-dom';
import React from "react";
import {Provider} from 'react-redux';
import MortgageContainer from "./ba_mortgage/containers/MortgageContainer";
import UploadFilesContainer from "./ba_mortgage/containers/UploadFilesContainer";
import store from "./ba_mortgage/store";

ReactDOM.render(
  <Provider store={store}>
  	<MortgageContainer/>
    <UploadFilesContainer/>
  </Provider>,
  document.getElementById('ba_mortgage')
);