import React, { Component } from 'react';
import TrackingVisitor from './TrackingVisitor';
import ModalSaveTracking from './ModalSaveTracking';
import ModalInfoTracking from './ModalInfoTracking';

class App extends Component {
    render() {
        return (
            <div>
                <TrackingVisitor/>
                <ModalSaveTracking/>
                <ModalInfoTracking/>
            </div>
        );
    }
}

export default App;