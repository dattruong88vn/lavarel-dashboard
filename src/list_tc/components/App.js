import React, { Component } from 'react';
import ListTc from './ListTc';
import ModalInfoTc from './ModalInfoTc';

class App extends Component {
    render() {
        return (
            <div>
                <ListTc/>
                <ModalInfoTc/>
            </div>
        );
    }
}

export default App;