import React, { Component, Fragment } from 'react';
import MatchingPanelContainer from '../containers/MatchingPanelContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <Fragment>
            <MatchingPanelContainer/>
        </Fragment>
    )
  }
}

export default App;