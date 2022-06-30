import React, { Component } from 'react';
import ListBankContainer from '../containers/ListBankContainer';
import ModalBankContainer from '../containers/ModalBankContainer';
import ModalProfileContainer from '../containers/ModalProfileContainer';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
        <div>
            <ListBankContainer/>
            <ModalBankContainer/>
            <ModalProfileContainer/>
        </div>
    )
  }

}

export default App;