import React, { Component } from 'react';
import MortgageContainer from '../containers/MortgageContainer';
import ModalProcessProfileContainer from '../../pfs_list/containers/ModalProcessProfileContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <div>
            <MortgageContainer/>
            <ModalProcessProfileContainer/>
        </div>
    )
  }

}

export default App;