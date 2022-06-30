import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import Error from 'components/utils/Error';
import AuthorisedRoute from 'components/auth/AuthorisedRoute';
import LoadingBoundary from 'components/utils/LoadingBoundary';
import BsaDashboard from 'components/bsaDashBoard/BsaDashboard';
import BpoImprove from 'components/bpoImprove/BpoImprove';
import BaDashboard from 'components/baDashboard/BaDashboard';

const AdminApp: React.FC = () => {
    return (
        <Router basename={'/'} >
            <div className={'app'}>
                <Error />
                <LoadingBoundary />
                <Switch>
                    <AuthorisedRoute exact path={'/ba-dashboard'} component={BaDashboard} />
                    <AuthorisedRoute exact path={'/pipeline'} component={BaDashboard} />
                    <AuthorisedRoute exact path={'/funnel'} component={BaDashboard} />
                    <AuthorisedRoute exact path={'/bpo-buyside'} component={BaDashboard} />
                    <AuthorisedRoute exact path={'/deal'} component={BaDashboard} />
                    <AuthorisedRoute exact path={'/pos/sa'} component={BsaDashboard} />
                    <AuthorisedRoute exact path={'/bpo-listing'} component={BpoImprove} />
                </Switch>
            </div>
        </Router>
    );
};

export default AdminApp;