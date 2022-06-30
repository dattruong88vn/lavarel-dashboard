import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import DocumentListBuilder from './containers/DocumentListBuilder';
import DocumentFormBuilder from './containers/DocumentFormBuilder';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/commission-document" component={DocumentListBuilder} />
                    <Route exact path="/commission-document/add" component={DocumentFormBuilder} />
                    <Route exact path="/commission-document/detail/:id" component={DocumentFormBuilder} />
                </div>
            </Router>
        );
    }
}

export default App;