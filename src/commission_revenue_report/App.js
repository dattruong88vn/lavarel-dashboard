import React, { Component } from 'react';
import uniqid from 'uniqid';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommissionRevenueReport from './components/CommissionRevenueReport';

const ROUTES = [
    { 
        id: uniqid(), 
        path: '', 
        exact: true,
        component: CommissionRevenueReport
    }
]

export default class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    {ROUTES.map(route =>
                        <Route 
                            key={route.id}
                            exact={route.exact} 
                            path={route.path}
                            component={route.component}
                        />
                    )}
                </Switch>
            </Router>
        )
    }
}