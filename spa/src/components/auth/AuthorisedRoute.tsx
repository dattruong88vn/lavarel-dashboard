import React, {useEffect} from 'react';
import {Route, RouteProps} from 'react-router';
import {isSessionAlive} from '../../api/user/userApi';

const AuthorisedRoute: React.FC<RouteProps> = ({location, ...rest}) => {
    useEffect(() => {        
        (async () => {
            const res = await isSessionAlive();
            if (!res.isAlive) {
                window.location.href = '/login';
            }
        })();
    }, [location, rest]);
    return (<Route {...rest} />);
};

export default AuthorisedRoute;
