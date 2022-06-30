import React, { Component } from 'react';
import TrackingNotifyHistory from './TrackingNotifyHistory';
import ModalRead from './ModalRead';
import ModalUnread from './ModalUnread';

class App extends Component {
    render() {
        return (
            <div>
                <TrackingNotifyHistory/>
                <ModalRead/>
                <ModalUnread/>
            </div>
        );
    }
}

export default App;