import React, { Component } from 'react';
import PfsListContainer from '../containers/PfsListContainer';
import ModalProcessProfileContainer from '../containers/ModalProcessProfileContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <div>
            <PfsListContainer/>
            <ModalProcessProfileContainer/>
        </div>
    )
  }

}

export default App;