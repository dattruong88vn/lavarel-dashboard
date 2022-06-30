import React, { Component, Fragment } from 'react';
import ModalLogScoreCardContainer from '../containers/ModalLogScoreCardContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <Fragment>
            <ModalLogScoreCardContainer/>
        </Fragment>
    )
  }

}

export default App;