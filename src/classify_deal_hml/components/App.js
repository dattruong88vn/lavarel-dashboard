import React, { Component, Fragment } from 'react';
import ClassifyDealHMLContainer from '../containers/ClassifyDealHMLContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <Fragment>
            <ClassifyDealHMLContainer/>
        </Fragment>
    )
  }

}

export default App;