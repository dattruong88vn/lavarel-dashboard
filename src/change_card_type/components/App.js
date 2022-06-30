import React, { Component, Fragment } from 'react';
import ModalCardTypeContainer from '../containers/ModalCardTypeContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <Fragment>
            <ModalCardTypeContainer/>
        </Fragment>
    )
  }

}

export default App;