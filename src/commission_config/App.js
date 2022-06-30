import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import CommissionConfigBuilder from './containers/CommissionConfigBuilder';
import CommissionConfigFormBuilder from './containers/CommissionConfigFormBuilder';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route path="/commission-config/index" component={CommissionConfigBuilder} />
                    <Route path="/commission-config/add" component={CommissionConfigFormBuilder} />
                    <Route path="/commission-config/detail/:id" component={CommissionConfigFormBuilder} />
                    <Route exact path="/commission-config" component={CommissionConfigBuilder} />
                </div>
            </Router>
        );
    }
}

export default App;